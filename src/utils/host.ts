interface envHostInterfaces {
  [propName: string]: string;
}
interface servicesInterfaces {
  NO_GATEWAY: string;
  SSO: string;
  USER: string;
  REPORT: string;
  DASHBOARD: string;
  CRM_CENTER: string;
  FILE: string;
  DICTIONARY: string;
  MARKET: string;
  ALSMARKET: string;
  COUPON: string;
  CALL: string;
  ORDER_CENTER: string;
  INTEGRAL: string;
  PUBLIC: string;
  BUSINESS: string;
  CMS: string;
  DOWNLOAD: string;
  BURIED_POINT: string;
  EDUCATION: string; // 新教务
  STATISTICAL_REPORT: string;
  USERCENTER: string;
  TOB_MODULE_AGGSERVICE: string;
  MARKETING_SYNTHESIS_SERVICE: string;
}
/**
 * 当前环境变量
 */
// process.env 在vite中不能用
// export const whyEnv = import.meta.env.VITE_REACT_URL || "";
/**
 * 接口地址
 * @description env 可为主要环境或自定义地址
 */
const apiAddress: envHostInterfaces = {
  dev: "http://192.168.10.21:31000",
  qa: "http://192.168.10.61:31000",
  pre: "http://192.168.10.201:31000",
  prod: "https://msapi.ailecheng.com",
};
/**
 * 开发代理前缀
 */
const proxyApi = "/api";
const mockEnable = true;
// 静态资源前缀URL
const fileResourceHost: envHostInterfaces = {
  dev: "http://192.168.10.21:30999", // 外网:无
  qa: "http://192.168.10.61:30999", //外网:http://filecdn-fat.ailecheng.com:31999
  pre: "http://192.168.10.201:30999/", //外网:http://filecdn-uat.ailecheng.com:30999
  prod: "https://filecdn.ailecheng.com",
};
const staticResourceHost = "https://filecdn.ailecheng.com";
const servicesEnums = (env: string): servicesInterfaces => ({
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
const services = servicesEnums(proxyApi);
const servicesMock = servicesEnums(mockEnable ? "" : proxyApi);
export {
  proxyApi,
  staticResourceHost,
  services,
  apiAddress,
  servicesMock,
  fileResourceHost,
};
