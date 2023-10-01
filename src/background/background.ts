import { openPopup } from "./openPopup";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUser } from "./createUser";

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
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in.");
  } else {
    console.log("No user is signed in.");
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
