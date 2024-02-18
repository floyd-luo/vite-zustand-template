import { createWithEqualityFn } from "zustand/traditional";
import { createUser, UserInterface } from "./user";
import { createToken, TokenStateInterface } from "./token";
export type Store = UserInterface & TokenStateInterface;
export const useStore = createWithEqualityFn<Store>()((...a) => ({
  ...createToken(...a),
  ...createUser(...a),
}));
