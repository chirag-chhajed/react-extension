import { openPopup, openDashboard } from "@/lib/openPopup";
import { initializeApp, setLogLevel } from "firebase/app";
import {
  CACHE_SIZE_UNLIMITED,
  Timestamp,
  collection,
  // getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { createUser } from "@/lib/createUser";
import { getGoogleAuthCredential } from "@/lib/googleLogin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import XMLHttpRequest from "xhr-shim";

globalThis["XMLHttpRequest"] = XMLHttpRequest;
const firebaseConfig = {
  apiKey: "AIzaSyC-GlX_NJEBnfcJm9v0bjk4Nt8trG_0QDg",
  authDomain: "swift-search-chrome-extension.firebaseapp.com",
  projectId: "swift-search-chrome-extension",
  storageBucket: "swift-search-chrome-extension.appspot.com",
  messagingSenderId: "240104267874",
  appId: "1:240104267874:web:40a3c410f8edecf9a1713b",
};

const app = initializeApp(firebaseConfig);
setLogLevel("debug");

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache({
    tabManager: persistentSingleTabManager({
      // forceOwnership for web worker
      forceOwnership: !globalThis.localStorage,
    }),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

// export const db = getFirestore(app);
const siteRef = collection(db, "sites");

const auth = getAuth(app);

// commands
openPopup();
openDashboard();

const signIn = async () => {
  try {
    const credential = await getGoogleAuthCredential();
    const result = await signInWithCredential(auth, credential);
    console.log(result.user, "user");
    return result.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.action) {
    case "user":
      onAuthStateChanged(auth, (user) => {
        if (user) {
          sendResponse({ success: true, user: user });
        } else {
          sendResponse({ success: true, user: null });
        }
      });
      break;

    case "client":
      console.log(request, "request");
      console.log(request.data, "request.data");
      createUser(auth, request.data.email, request.data.password);
      sendResponse({ success: true });
      break;

    case "googleLogin":
      console.log(request, "request");
      // console.log(request.data, "request.data");
      signIn()
        .then((user) => {
          console.log(user, "user");
          sendResponse({ success: true, user: user });
        })
        .catch((error) => {
          console.log(error, "error");
        });
      // sendResponse({ success: true });
      break;

    case "signOut":
      console.log(request, "request");
      signOut(auth);
      sendResponse({ success: true });
      break;
    case "ADD_SITE":
      console.log(request, "request");
      new Promise((resolve, reject) => {
        addDoc(siteRef, {
          title: request.payload.title,
          url: request.payload.url,
          user_id: request.payload.user_id,
          created_at: Timestamp.now(),
          updated_at: Timestamp.now(),
          isPin: request.payload.isPin,
          favicon: request.payload.favicon ?? "",
          description: request.payload.description ?? "",
        })
          .then(() => {
            sendResponse({ success: true });
            console.log("success in adding doc");
            resolve(true); // Resolve the promise to indicate success
          })
          .catch((error) => {
            console.error(error);
            reject(error); // Reject the promise to indicate an error
          });
      });
      break;

    default:
      console.log(request, "request");
      break;
  }
  return true;
});
