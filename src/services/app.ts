import { request, host } from "@utils";

const { SSO, NO_GATEWAY } = host.services;
export const app = () => {
  const obj = {};
  const config = [
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
  config.forEach(
    (item: {
      fn: string;
      url: string;
      method: string;
      Authorization?: boolean;
    }) => {
      obj[item.fn] = (data) => {
        return request({
          url: item.url,
          method: item.method || "form",
          data,
          Authorization: item.Authorization,
        });
      };
    }
  );
  return obj;
};
