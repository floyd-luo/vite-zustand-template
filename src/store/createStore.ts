import { create } from "zustand";
import { createUser, User } from "./user";
import { createToken, Token } from "./token";

export type Store = User & Token;
export const useStore = create<Store>()((...a) => ({
  ...createToken(...a),
  ...createUser(...a),
}));
