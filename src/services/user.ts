import { request, host } from "@/utils";
import { appObjInterface, configInterface } from "@/typeings/service";
const { SSO, USERCENTER } = host.services;
const { USERCENTER: USERCENTER_MOCK } = host.servicesMock;
export const userConfig: Array<configInterface> = [
  {
    fn: "userInfo",
    method: "get",
    url: `${SSO}/oauth/userinfo`,
  },
  {
    fn: "logout",
    method: "delete",
    url: `${SSO}/oauth/remove/token`,
  },
  {
    fn: "updatePassword",
    method: "put",
    url: `${USERCENTER}/users/password`,
  },
  {
    fn: "getMenuList",
    method: "get",
    url: `${USERCENTER_MOCK}/menus/current`,
  },
];
export const user = () => {
  const obj: appObjInterface = {};
  userConfig.forEach((item: configInterface) => {
    obj[item.fn] = (data) => {
      return request({
        url: item.url,
        method: item.method || "form",
        data,
      });
    };
  });
  return obj;
};
