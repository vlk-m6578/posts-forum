import { login } from "@/api/auth";
import { getJwtToken, removeJwtToken, setJwtToken } from "@/services/storageService";
import type { User } from "@/types/user";
import { create } from "zustand";

interface State {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useStore = create<State>((set) => ({
  user: null,
  token: getJwtToken(),
  login: async (email, password) => {
    const res = await login(email, password);
    setJwtToken(res.data.token);

    set({
      user: res.data.user,
      token: res.data.token
    })

  },
  logout: () => {
    removeJwtToken();

    set({
      user: null,
      token: null
    })
  },
}))

