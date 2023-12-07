import { StateCreator } from "zustand";
import { user } from "@services";
import { localStorage } from "front-ent-tools";
import { Store } from "./createStore";

const UserServe = user();
export interface User {
  user: any;
  dataPermission: any;
  userOtherInfo: any;
  getUserInfo: () => Promise<any>;
}

export const initUser = {
  user: {},
  dataPermission: {},
  userOtherInfo: {},
};
export const createUser: StateCreator<
  Store,
  [],
  [["zustand/persist", User]],
  User
> = (set) => ({
  ...initUser,
  getUserInfo: async () => {
    const res = await UserServe.userInfo();
    if (res?.resp_code === "200") {
      const { user, dataPermission, userOtherInfo } = res ?? {};
      localStorage.set({
        user: JSON.stringify(user),
        dataPermission: JSON.stringify(dataPermission),
      });
      set({
        user,
        dataPermission,
        userOtherInfo,
      });
      return { user, dataPermission, userOtherInfo };
    } else {
      return false;
    }
  },
});
