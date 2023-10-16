import { openPopup, openDashboard } from "@/lib/openPopup";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, doc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { createUser } from "@/lib/createUser";
import { getGoogleAuthCredential } from "@/lib/googleLogin";
import { SwiftSearchDB } from "@/lib/SwiftSearchDB";

const firebaseConfig = {
  apiKey: "AIzaSyC-GlX_NJEBnfcJm9v0bjk4Nt8trG_0QDg",
  authDomain: "swift-search-chrome-extension.firebaseapp.com",
  projectId: "swift-search-chrome-extension",
  storageBucket: "swift-search-chrome-extension.appspot.com",
  messagingSenderId: "240104267874",
  appId: "1:240104267874:web:40a3c410f8edecf9a1713b",
};

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "index.html" });
    chrome.runtime.setUninstallURL(
      "https://swift-search.netlify.app/uninstall"
    );
  }
});

export const Dexiedb = new SwiftSearchDB();

Dexiedb.version(1).stores({
  sites: "++id, title,description, url, favicon, createdAt, updatedAt",
});

export const app = initializeApp(firebaseConfig);
// setLogLevel("debug");

export const db = getFirestore(app);
export const siteRef = collection(db, "sites");
export const userRef = collection(db, "users");

const auth = getAuth(app);

export function getDocumentRef(collectionName: string, documentId: string) {
  return doc(db, collectionName, documentId);
}

// commands
openPopup();
openDashboard();

const signIn = async () => {
  try {
    const credential = await getGoogleAuthCredential();
    const result = await signInWithCredential(auth, credential);
    return result.user;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// let sites: siteType[] = [];

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
    default:
      console.log(request, "request");
      break;
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "getData") {
    (async () => {
      try {
        const isEmpty = await Dexiedb.isEmpty();
        console.log(isEmpty, "isEmpty");

        if (!isEmpty) {
          const sites = await Dexiedb.getAllSites();
          sendResponse({ success: true, sites });
        } else {
          sendResponse({ success: true, sites: [] });
        }
      } catch (error) {
        sendResponse({ success: false });
      }
    })();

    return true;
  }
});
