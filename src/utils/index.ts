import queryString from "query-string";
import request from "./request";
import * as host from "./host";
import resource from "@/resource";
import websiteApprove from "./websiteApprove";

interface typeInterface {
  [propsName: string]: string;
}
/**
 * 获取URL参数
 */
export function parseQuery() {
  return queryString.parseUrl(window.location.href).query;
}
const getDefaultHP = (sex: string): string => {
  if (!sex) return resource?.none;
  const type: typeInterface = {
    "0": resource?.defaultFemaleProfilePicture,
    "1": resource?.defaultMaleProfilePicture,
    "3": resource?.none,
  };
  return type[sex];
};
const getUseHP = (headImgUrl: string, sex: string) => {
  if (headImgUrl) return `${host.fileResourceHost}${headImgUrl}`;
  return getDefaultHP(sex);
};
export { request, host, websiteApprove, getDefaultHP, getUseHP };
