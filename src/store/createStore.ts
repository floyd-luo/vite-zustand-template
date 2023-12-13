import { createWithEqualityFn } from "zustand/traditional";
import { createUser, User } from "./user";
import { createToken, Token } from "./token";

export type Store = User & Token;
export const useStore = createWithEqualityFn<Store>()((...a) => ({
  ...createToken(...a),
  ...createUser(...a),
}));
