import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { app } from "@/services";
import { Store } from "./createStore";

const AppServe = app();
interface loginParamsInterface {
  username: string;
  password: string;
  deviceId: string;
  grant_type: string;
  validCode_type: string;
  dragXpos: string;
}
export interface TokenInterface {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  appToken: string | null;
  appTokenExpireTime: string | null;
  resetToken: () => void;
  getAppToken: () => void;
  login: (params: loginParamsInterface) => Promise<boolean>;
  getValidCode: () => Promise<{
    deviceId: string;
    originalImage: string;
    slidingImage: string;
    xwidth: number | null;
    yheight: number | null;
  }>;
}

export const initToken = {
  appToken: null,
  appTokenExpireTime: null,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
};
export const createToken: StateCreator<
  Store,
  [],
  [["zustand/persist", TokenInterface]],
  TokenInterface
> = persist(
  (set) => ({
    ...initToken,
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
