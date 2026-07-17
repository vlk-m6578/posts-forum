import { login } from "@/api/auth";
import { getUserById } from "@/api/users";
import { getJwtToken, removeJwtToken, setJwtToken } from "@/services/storageService";
import type { User } from "@/types/user";
import { create } from "zustand";

interface State {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;

  register: () => void;
}

export const useStore = create<State>(set => ({
  user: null,
  token: getJwtToken(),
  login: async (email, password) => {
    const res = await login(email, password);
    setJwtToken(res.data.token);

    const userProfile = await getUserById(res.data.user.id);
    console.log(userProfile);

    set({
      user: userProfile.data,
      token: res.data.token,
    })
  },
  logout: () => {
    removeJwtToken();

    set({
      user: null,
      token: null,
    })
  },
  register: () => {

  }
}))