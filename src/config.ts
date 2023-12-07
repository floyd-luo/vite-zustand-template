/**
 * 当前环境变量
 */
// process.env 在vite中不能用
// export const whyEnv = import.meta.env.VITE_REACT_URL || "";
/**
 * 接口地址
 * @description env 可为主要环境或自定义地址
 */
export const apiAddress = {
  dev: "http://192.168.10.21:31000",
  qa: "http://192.168.10.61:31000",
  pre: "http://192.168.10.201:31000",
  prod: "https://msapi.ailecheng.com",
};
/**
 * 开发代理前缀
 */
export const proxyApi = "/api";
