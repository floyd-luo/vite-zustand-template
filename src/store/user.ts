import { StateCreator } from "zustand";
import { user } from "@/services";
import { localStorage } from "front-ent-tools";
import { Store } from "./createStore";

const UserServe = user();
export interface UserInterface {
  user: any;
  dataPermission: any;
  userOtherInfo: any;
  menuList: Array<any>;
  getUserInfo: () => Promise<any>;
  getMenuList: () => Promise<any>;
}

export const initUser: UserInterface = {
  user: {},
  menuList: [],
  dataPermission: {},
  userOtherInfo: {},
  getUserInfo: () => new Promise(() => null),
  getMenuList: () => new Promise(() => []),
};
export const createUser: StateCreator<
  Store,
  [],
  [["zustand/persist", UserInterface]],
  UserInterface
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
  getMenuList: async () => {
    const res = await UserServe.getMenuList();
    if (res?.resp_code === 0) {
      set({
        menuList: res?.data,
      });
      return res?.data;
    } else {
      return [];
    }
  },
});
