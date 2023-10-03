import { openPopup } from "./openPopup";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { createUser } from "./createUser";
import { getGoogleAuthCredential } from "./googleLogin";

const firebaseConfig = {
  apiKey: "AIzaSyC-GlX_NJEBnfcJm9v0bjk4Nt8trG_0QDg",
  authDomain: "swift-search-chrome-extension.firebaseapp.com",
  projectId: "swift-search-chrome-extension",
  storageBucket: "swift-search-chrome-extension.appspot.com",
  messagingSenderId: "240104267874",
  appId: "1:240104267874:web:40a3c410f8edecf9a1713b",
};

const app = initializeApp(firebaseConfig);

const dbRef = ref(getDatabase(app));
get(child(dbRef, `/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
const auth = getAuth();

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "user") {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        sendResponse({ success: true, user: user });
      } else {
        sendResponse({ success: true, user: null });
      }
    });
  }
});

openPopup();

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log(request, "request");
  if (request.action === "client") {
    console.log(request.data, "request.data");
    createUser(auth, request.data.email, request.data.password);
    sendResponse({ success: true });
  }
  return true;
});
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
  console.log(request, "request");
  if (request.action === "googleLogin") {
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
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log(request, "request");
  if (request.action === "signOut") {
    signOut(auth);
    sendResponse({ success: true });
  }
  return true;
});
