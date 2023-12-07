import queryString from "query-string";
import request from "./request";
import host from "./host";
import websiteApprove from "./websiteApprove";
/**
 * 获取URL参数
 */
export function parseQuery() {
  return queryString.parseUrl(window.location.href).query;
}

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
  (process.env.NODE_ENV === "production" && !!permits) ||
  process.env.NODE_ENV === "development";
export { request, host, websiteApprove };
