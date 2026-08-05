import { login, register } from "@/api/auth";
import { getMyProfile, getProfile, getUserById } from "@/api/users";
import { getJwtToken, removeJwtToken, setJwtToken } from "@/services/storageService";
import type { User } from "@/types/user";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string, country: string, city: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: getJwtToken(),
  isLoading: false,
  initializeAuth: async () => {
    try {
      const token = getJwtToken();
      if (!token) return;

      const res = await getMyProfile();

      set({
        user: res.data,
        token,
      })
    } catch {
      removeJwtToken();

      set({
        user: null,
        token: null,
      })
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoading: true });

      const res = await login(email, password);
      setJwtToken(res.data.token);

      const userProfile = await getUserById(res.data.user.id);

      set({
        user: userProfile.data,
        token: res.data.token,
        isLoading: false,
      })
    } finally {
      set({
        isLoading: false
      })
    }
  },
  logout: () => {
    removeJwtToken();

    set({
      user: null,
      token: null,
    })
  },
  register: async (username, email, password, country, city) => {
    try {
      await register(username, email, password, country, city);
    } finally {
      set({
        isLoading: false
      })
    }
  }
}))