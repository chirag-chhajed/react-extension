import { openPopup, openDashboard } from "@/lib/openPopup";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, doc, Timestamp } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { createUser } from "@/lib/createUser";
import { getGoogleAuthCredential } from "@/lib/googleLogin";
import Dexie from "dexie";

const firebaseConfig = {
  apiKey: "AIzaSyC-GlX_NJEBnfcJm9v0bjk4Nt8trG_0QDg",
  authDomain: "swift-search-chrome-extension.firebaseapp.com",
  projectId: "swift-search-chrome-extension",
  storageBucket: "swift-search-chrome-extension.appspot.com",
  messagingSenderId: "240104267874",
  appId: "1:240104267874:web:40a3c410f8edecf9a1713b",
};

class SwiftSearchDB extends Dexie {
  sites: Dexie.Table<Site, string>;

  constructor() {
    super("SwiftSearchDB");
    this.version(1).stores({
      sites:
        "++id, title, description, url, favicon, createdAt, updatedAt, isPin",
    });
    this.sites = this.table("sites");
  }

  async addSite(site: Site): Promise<void> {
    try {
      await this.sites.add(site);
      console.log("site added");
    } catch (error) {
      console.error(`Failed to add site: ${error}`);
      throw error;
    }
  }
  async addMultipleSites(sites: Site[]): Promise<void> {
    // const addedSiteIds: number[] = [];

    for (const site of sites) {
      await this.addSite(site);
    }
    console.log("multiple sites added");

    // return addedSiteIds;
  }

  // Custom method to get the number of documents in the 'sites' collection
  async getSiteCount(): Promise<number> {
    try {
      const count = await this.sites.count();
      return count;
    } catch (error) {
      console.error(`Failed to get the site count: ${error}`);
      throw error;
    }
  }
  async updateSite(siteId: string, data: Partial<Site>): Promise<void> {
    const updatedData: Partial<Site> = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    try {
      await this.sites.update(siteId, updatedData);
      console.log(`Site with ID ${siteId} updated.`);
    } catch (error) {
      console.error(`Failed to update site: ${error}`);
      throw error;
    }
  }

  // Custom method to delete a site by ID
  async deleteSite(siteId: string): Promise<void> {
    try {
      await this.sites.delete(siteId);
      console.log(`Site with ID ${siteId} deleted.`);
    } catch (error) {
      console.error(`Failed to delete site: ${error}`);
      throw error;
    }
  }
}

export interface Site {
  id: string;
  title: string;
  description?: string;
  url: string;
  favicon: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isPin: boolean;
}

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
