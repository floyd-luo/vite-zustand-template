import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { isArray, isEmpty, cloneDeep } from "lodash-es";
import qs from "qs";
import { encodeSearchParams, localStorage } from "front-ent-tools";
import { message as Message } from "antd";
import navigatorInfo from "navigator-info";
import { errorCode, gatewayErrorCode } from "./code";

interface optionsInterface {
  method: string;
  data: any;
  url: string;
  Authorization?: boolean;
  notThrowWhenError?: boolean;
}
interface otherConfigInterface {
  [propsName: string]: Promise<AxiosResponse<any, any>> | Promise<any>;
}
interface typeInterface {
  [propName: string]: (
    data: any,
    url: string,
    token: string,
    AppToken: string,
    method: string
  ) => Promise<AxiosResponse<any, any>> | Promise<any>;
}
interface configInterface extends InternalAxiosRequestConfig<any> {
  mark?: string;
}
interface responseInterface extends AxiosResponse {
  config: configInterface;
}
interface requestInterface {
  [propName: string]: any;
}
declare global {
  interface Window {
    requestRecord: any;
  }
}
const _requestRecord: requestInterface = {};
const _navigatorInfo = navigatorInfo();
// 设置post header
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["client_id"] = "webApp";
axios.defaults.headers.common["client_secret"] = "webApp";
axios.defaults.headers.common["AppNice"] = "erp-api";
axios.defaults.headers.common["AppPassWd"] = "erp-api";
axios.defaults.headers.common["device"] = _navigatorInfo?.device;
axios.defaults.headers.common["product"] = "boss";
axios.defaults.headers.common["version"] = "v1.5.8";
axios.defaults.headers.common["browser"] = _navigatorInfo?.browser;
axios.defaults.headers.common["os"] = _navigatorInfo?.os;
axios.defaults.headers.common["engine"] = _navigatorInfo?.engine;
axios.defaults.headers.common["screen_width"] = window.screen.width;
axios.defaults.headers.common["screen_height"] = window.screen.height;
let errNum = 0;
const CancelToken = axios.CancelToken;
window.requestRecord = _requestRecord;
axios.interceptors.request.use(
  (config: any) => {
    const request = config.url + "_" + new Date().getTime().toString();
    // 这里配置了cancelToken属性，覆盖了原请求中的cancelToken
    config.cancelToken = new CancelToken((cancel) => {
      _requestRecord[request] = cancel;
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response: responseInterface) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.log(error.response);
      Object.keys(_requestRecord).forEach((item) => {
        _requestRecord[item]?.();
      });
    }
    throw error;
  }
);
const click = (node: HTMLElement) => {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    const evt = new MouseEvent("mousedown");
    node.dispatchEvent(evt);
  }
};
const type: typeInterface = {
  get: (data: any, url: string) =>
    axios.get(url, {
      params: data,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    }),
  getjoint: (data: any, url: string) => {
    const { uuid, random } = data;
    return axios.get(`${url}/${uuid}`, {
      params: { random },
      responseType: "blob",
      paramsSerializer: (params) => {
        const { random: _random } = params;
        return qs.stringify({ random: _random }, { indices: false });
      },
    });
  },
  getid: (data: any, url: string) => axios.get(`${url}/${data}`),
  getids: (data: any, url: string) => {
    let _data = "";
    if (isArray(data)) {
      _data = data.join("/");
    }
    return axios.get(`${url}/${_data}`);
  },
  delete: (data: any, url: string) => {
    const delData = isEmpty(data) ? "" : `/${data}`;
    return axios.delete(url + delData);
  },
  deleteid: (data: any, url: string) => axios.delete(`${url}/${data}`),
  deleteobj: (data: any, url: string) =>
    axios.delete(`${url}?${qs.stringify(data)}`),
  post: (data: any, url: string) =>
    axios({
      url,
      data: data,
      method: "post",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }),
  postid: (data: any, url: string) => axios.post(`${url}/${data}`),
  postquery: (data: any, url: string) => {
    const cloneData = qs.stringify(cloneDeep(data));
    return axios({
      url,
      data: cloneData,
      method: "post",
    });
  },
  put: (data: any, url: string) => axios.put(url, data),
  putid: (data: any, url: string) => axios.put(`${url}/${data}`),
  patch: (data: any, url: string) => {
    const cloneData = qs.stringify(cloneDeep(data));
    return axios.patch(url, cloneData);
  },
  form: (data: any, url: string) => {
    const cloneData = qs.stringify(cloneDeep(data));
    return axios({
      url,
      data: cloneData,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  },
  download: (
    data: any,
    url: string,
    token: string,
    AppToken: string,
    method: string
  ) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method.toUpperCase() === "DOWNLOAD" ? "get" : method.toUpperCase(),
        `${url}?${
          method === "get" || method === "download"
            ? encodeSearchParams(data)
            : ""
        }`,
        true
      );
      xhr.responseType = "blob";
      xhr.setRequestHeader("Authorization", `bearer ${token}`);
      xhr.setRequestHeader("client_id", "webApp");
      xhr.setRequestHeader("client_secret", "webApp");
      xhr.setRequestHeader("AppToken", AppToken);
      if (method === "post") {
        xhr.setRequestHeader("Content-type", "application/json");
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const name = xhr.getResponseHeader("Content-disposition");
          const filename = name
            ? window.decodeURIComponent(name.split("filename=")?.[1])
            : "";
          const a = document.createElement("a");
          a.href = URL.createObjectURL(xhr.response);
          a.target = "_blank";
          a.download = filename;
          a.rel = "noopener";
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
          }, 4e4); // 40s
          setTimeout(function () {
            click(a);
          }, 0);
          resolve({ data: { status: "OK" } });
        }
      };
      xhr.onerror = function () {
        reject({ data: { status: "err" } });
        console.error("could not download file");
      };
      xhr.send(method === "post" ? JSON.stringify(data) : undefined);
    });
  },
  downloadpost: (
    data: any,
    url: string,
    token: string,
    method = "post",
    AppToken: string
  ) => type.download(data, url, token, method, AppToken),
};
// 如果不需要token验证则在接口配置里面加入Authorization = false即可
const fetch = (
  options: optionsInterface,
  extraHeader?: otherConfigInterface
) => {
  const { method = "form", data = {}, url, Authorization = true } = options;
  const token = localStorage.get("accessToken");
  const AppToken = localStorage.get("appToken");
  if (Authorization && token) {
    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }
  if (!Authorization && axios.defaults.headers.common.Authorization) {
    delete axios.defaults.headers.common.Authorization;
  }
  if (AppToken) {
    axios.defaults.headers.common["AppToken"] = AppToken;
  }
  if (extraHeader?.accesCode) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 后端加的验证登录的header不是常规用法
    axios.defaults.headers.common["accesCode"] = extraHeader?.accesCode;
  }
  return type[method.toLowerCase()](
    data,
    url,
    token,
    method.toLowerCase(),
    AppToken
  );
};
// 401token无效 和网关appToken无效
const tokenInvalid = async (pathname: string) => {
  localStorage.remove([
    "access_token",
    "admin_isLogin",
    "is_get_info",
    "admin_menusAyy",
    "admin_menus",
    "user",
    "menuArray",
    "permissions",
    "loginName",
    "password",
  ]);
  errNum += 1;
  window.history.pushState({ from: pathname }, "", "/login");
};
export default function request(
  options: optionsInterface,
  otherConfig?: otherConfigInterface
) {
  const pathname = window.location.pathname;
  if (
    options?.url.indexOf("oauth/user/token") >= 0 ||
    options?.url.indexOf("validata/dragcode") >= 0
  ) {
    errNum = 0;
  }
  return fetch(options, otherConfig)
    .then((response) => {
      const data = response.data;
      //已被网关拦截，跳转登录页面
      if (data?.code && Object.keys(gatewayErrorCode).includes(data.code)) {
        localStorage.set({ appTokenInvalid: "1" });
        if (errNum === 0) {
          Message.error("用户已过期，请重新登录");
        }
        tokenInvalid(pathname);
        return;
      }
      const respCode = Number(data?.resp_code ?? 0);
      if (respCode && errorCode.includes(respCode)) {
        return Promise.reject({
          success: false,
          message: data.resp_msg,
          response,
        });
      }
      if (!data.data && data.data !== 0) {
        data.data = [];
      }
      return Promise.resolve(data.datas || data);
    })
    .catch(function (error) {
      const { response } = error;
      let msg;
      let statusCode;
      if (!response) return;
      if (response && response instanceof Object) {
        const { data } = response;
        statusCode = Number(data?.resp_code || data.code);
        // 401token无效
        /*if (statusCode === 401 || data?.error === "invalid_token") {
          if (errNum === 0) {
            Message.error(data?.rsp_msg || "用户已过期，请重新登录");
          }
          tokenInvalid(pathname);
          return;
        }*/
        msg =
          data.error ||
          data.resp_msg ||
          data.rsp_msg ||
          "服务器异常，稍后重试！";
        if (options.notThrowWhenError) {
          return Promise.resolve(data);
        }
      }
      return Promise.reject({
        success: false,
        statusCode,
        message: msg || "服务器异常，稍后重试",
      });
    });
}
