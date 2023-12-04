import { proxyApi } from "@/config";
export const fileResourceHost = {
  dev: "http://192.168.10.21:30999", // 外网:无
  qa: "http://192.168.10.61:30999", //外网:http://filecdn-fat.ailecheng.com:31999
  pre: "http://192.168.10.201:30999/", //外网:http://filecdn-uat.ailecheng.com:30999
  prod: "https://filecdn.ailecheng.com",
}[import.meta.env.mode];
export const staticResourceHost = "https://filecdn.ailecheng.com";
const services = (env) => ({
  NO_GATEWAY: env,
  SSO: `${env}/api-auth`,
  USER: `${env}/user-center`,
  REPORT: `${env}/api-bikanban`,
  DASHBOARD: `${env}/report-center`,
  CRM_CENTER: `${env}/crm-service`,
  FILE: `${env}/file-center`,
  DICTIONARY: `${env}/basicdata-center`,
  MARKET: `${env}/marketing-backend-center`,
  ALSMARKET: `${env}/marketing-center`,
  COUPON: `${env}/coupon-center`,
  CALL: `${env}/call-center`,
  ORDER_CENTER: `${env}/order-center`,
  INTEGRAL: `${env}/integral-center`,
  PUBLIC: `${env}/publicserver-center`,
  BUSINESS: `${env}/business-intelligence-center`,
  CMS: `${env}/cmsresources-center`,
  DOWNLOAD: `${env}/import-export-center`,
  BURIED_POINT: `${env}/buriedpoint-data-analysis`,
  EDUCATION: `${env}/education-center`, // 新教务
  STATISTICAL_REPORT: `${env}/statistical-report-service`,
  USERCENTER: `${env}/user-center`,
  TOB_MODULE_AGGSERVICE: `${env}/tob-module-aggservice`,
  MARKETING_SYNTHESIS_SERVICE: `${env}/marketing-synthesis-service`,
});
export default {
  services: services(proxyApi),
  staticResourceHost,
  fileResourceHost,
};
