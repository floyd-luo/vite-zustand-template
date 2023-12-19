import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { app } from "@/services";
import { Store } from "./createStore";

const AppServe = app();
interface deviceIdInterface {
  deviceId: string;
}
export interface validCodeInterface extends deviceIdInterface {
  originalImage?: string;
  slidingImage?: string;
  yheight?: number;
}
interface loginParamsInterface extends deviceIdInterface {
  username: string;
  password: string;
  grant_type: string;
  validCode_type: string;
  dragXpos: number;
  accesCode: string;
}
interface TokenInterface {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  appToken: string | null;
  appTokenExpireTime: string | null;
}
export interface TokenStateInterface
  extends validCodeInterface,
    TokenInterface {
  resetToken: () => void;
  getAppToken: () => void;
  login: (params: loginParamsInterface) => any;
  getValidCode: () => void;
}
const initToken: TokenInterface = {
  appToken: null,
  appTokenExpireTime: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
};
export const initState: TokenStateInterface = {
  ...initToken,
  deviceId: "",
  resetToken: () => null,
  getAppToken: () => null,
  login: () => null,
  getValidCode: () => null,
};
export const createToken: StateCreator<
  Store,
  [],
  [["zustand/persist", TokenStateInterface]],
    TokenStateInterface
> = persist(
  (set) => ({
    ...initState,
    // 重置token信息
    resetToken: () => {
      set({ ...initToken });
    },
    getAppToken: async () => {
      const res = await AppServe.getAppToken();
      if (res) {
        const { AppToken, ExpireTime } = res;
        const appTokenExpireTime = String(
          new Date().getTime() + ExpireTime * 1000
        );
        localStorage.setItem("appToken", AppToken);
        localStorage.setItem("appTokenExpireTime", appTokenExpireTime);
        set({
          appToken: AppToken,
          appTokenExpireTime,
        });
      }
    },
    login: async (params: loginParamsInterface) => {
      try {
        const res = await AppServe.login(params);
        if (res) {
          localStorage.setItem("accessToken", res.access_token);
          localStorage.setItem("refreshToken", res.refresh_token);
          const { access_token, refresh_token, expires_in } = res;
          set({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresIn: expires_in,
          });
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (e) {
        return e;
      }
    },
    getValidCode: async () => {
      const res = await AppServe.getValidImg();
      if (res?.resp_code === 0) {
        set({ ...res?.data });
      }
    },
  }),
  { name: "app-storage" }
);
