import { config } from "@/config/config";

export const getPageTitle = (pageTitle: string) => {
  return `${pageTitle} - ${config.title}`;
};