type SiteData = {
  title: string;
  description: string;
  favicon: string;
  url: string;
  isPin: boolean;
};
export interface siteType {
  id: string;
  data: SiteData;
}
