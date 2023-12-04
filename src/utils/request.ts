import axios from "axios";
import _ from "lodash";
import qs from "qs";
import queryString from "query-string";
import { encodeSearchParams, localStorage } from "rct-utils";
import { message as Message } from "antd";
import navigatorInfo from "navigator-info";
import { errorCode, gatewayErrorCode } from "./code";

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
const sources = {};
axios.interceptors.request.use(
  (config: any) => {
    const request = config.url + "_" + new Date().getTime().toString();
    // 这里配置了cancelToken属性，覆盖了原请求中的cancelToken
    config.cancelToken = new CancelToken((cancel) => {
      sources[request] = cancel;
    });
    config.mark = request;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const mark = response.config.mark;
    delete sources[mark];
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      console.log(error.response);
      Object.keys(sources).forEach((item) => {
        sources[item]?.();
      });
    }
    throw error;
  }
);
const click = (node) => {
  try {
    node.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    const evt = new MouseEvent("mousedown");
    node.dispatchEvent(evt);
  }
};
const type = {
  get: (data, url) =>
    axios.get(url, {
      params: data,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false });
      },
    }),
  getjoint: (data, url) => {
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
  getid: (data, url) => axios.get(`${url}/${data}`),
  getids: (data, url) => {
    let _data = "";
    if (_.isArray(data)) {
      _data = data.join("/");
    }
    return axios.get(`${url}/${_data}`);
  },
  delete: (data, url) => {
    const delData = _.isEmpty(data) ? "" : `/${data}`;
    return axios.delete(url + delData);
  },
  deleteid: (data, url) => axios.delete(`${url}/${data}`),
  deleteobj: (data, url) => axios.delete(`${url}?${qs.stringify(data)}`),
  post: (data, url) =>
    axios({
      url,
      data: data,
      method: "post",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }),
  postid: (data, url) => axios.post(`${url}/${data}`),
  postquery: (data, url) => {
    const cloneData = qs.stringify(_.cloneDeep(data));
    return axios({
      url,
      data: cloneData,
      method: "post",
    });
  },
  put: (data, url) => axios.put(url, data),
  putid: (data, url) => axios.put(`${url}/${data}`),
  patch: (data, url) => {
    const cloneData = qs.stringify(_.cloneDeep(data));
    return axios.patch(url, cloneData);
  },
  form: (data, url) => {
    const cloneData = qs.stringify(_.cloneDeep(data));
    return axios({
      url,
      data: cloneData,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });
  },
  download: (data, url, token, method = "get", AppToken) => {
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
  downloadpost: (data, url, token, method, AppToken) =>
    type.download(data, url, token, "post", AppToken),
};
// 如果不需要token验证则在接口配置里面加入Authorization = false即可
const fetch = (options) => {
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
  return type[method.toLowerCase()](
    data,
    url,
    token,
    method.toLowerCase(),
    AppToken
  );
};
// 401token无效 和网关appToken无效
const tokenInvalid = async (pathname) => {
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
  await router.push({
    pathname: "/login",
    search: queryString.stringify({
      from: pathname,
    }),
  });
};
export default function request(options, config = { formatResponse: true }) {
  const pathname = window.location.pathname;
  if (
    options?.url.indexOf("oauth/user/token") >= 0 ||
    options?.url.indexOf("validata/dragcode") >= 0
  ) {
    errNum = 0;
  }
  return fetch(options)
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

export const getNoInterrauptRequestFromService = (fn) => (args) =>
  new Promise((resolve) => {
    fn(args)
      .then(resolve)
      .catch((e) => {
        Message.error(e.message);
        resolve(e);
      });
  });
