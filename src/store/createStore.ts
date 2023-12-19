import { createWithEqualityFn } from "zustand/traditional";
import { createUser, User } from "./user";
import { createToken, TokenStateInterface } from "./token";

export type Store = User & TokenStateInterface;
export const useStore = createWithEqualityFn<Store>()((...a) => ({
  ...createToken(...a),
  ...createUser(...a),
}));
