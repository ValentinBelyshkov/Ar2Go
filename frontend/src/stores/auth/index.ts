import { create } from "zustand";

import { State } from "./types";
import { getCookie } from "../../utils";
import { SERVER_URL } from "../../constants";

export const useAuth = create<State>(() => ({
  isAuth: !!getCookie("access_token"),
  google: async () => {
    try {
      window.location.href = SERVER_URL + "/auth/google";
    } catch (e) {
      console.error(e);
    }
  },
}));
