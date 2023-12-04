import { request, host } from "@utils";

const { SSO, USERCENTER } = host.services;

export const user = () => {
  const obj = {};
  const config = [
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
  ];
  config.forEach((item) => {
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
