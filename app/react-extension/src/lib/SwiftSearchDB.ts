import Dexie from "dexie";
import { Timestamp } from "firebase/firestore";

export class SwiftSearchDB extends Dexie {
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
    for (const site of sites) {
      await this.addSite(site);
    }
    console.log("multiple sites added");
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

  async isEmpty(): Promise<boolean> {
    const number = await this.getSiteCount();
    return number === 0;
  }

  async getAllSites(): Promise<Site[]> {
    try {
      const sites = await this.sites.toArray();
      return sites;
    } catch (error) {
      console.error(`Failed to get sites: ${error}`);
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
