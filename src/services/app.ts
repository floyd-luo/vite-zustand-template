import { request, host } from "@/utils";
import { appObjInterface, configInterface } from "@/typeings/service";
const { SSO, NO_GATEWAY } = host.services;
export const app = () => {
  const obj: appObjInterface = {};
  const config: Array<configInterface> = [
    {
      fn: "getAppToken",
      method: "get",
      url: `${NO_GATEWAY}/getAppToken`,
      Authorization: false,
    },
    {
      fn: "login",
      method: "form",
      url: `${SSO}/oauth/user/token`,
      Authorization: false,
    },
    {
      fn: "getValidImg",
      method: "get",
      url: `${SSO}/validata/dragcode`,
    },
  ];
  config.forEach((item: configInterface) => {
    obj[item.fn] = (data) => {
      return request({
        url: item.url,
        method: item.method || "form",
        data,
        Authorization: item.Authorization,
      });
    };
  });
  return obj;
};
