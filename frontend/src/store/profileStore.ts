import { getMyProfile, updateProfile } from "../api/users";
import { create } from "zustand";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  country: string;
  city: string;
  createdAt: string;
  count: {
    posts: number;
    likes: number;
    comments: number;
  };
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  isUpdating: boolean;
  isEditing: boolean;

  getProfile: () => Promise<void>;
  updateProfile: (data: { username: string; country: string; city: string }) => Promise<void>;
  clearProfile: () => void;

  toggleIsEditing: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  isUpdating: false,
  isEditing: false,

  getProfile: async () => {
    try {
      set({ isLoading: true });
      const res = await getMyProfile();
      set({ profile: res.data });
    } finally {
      set({ isLoading: false });
    }
  },
  updateProfile: async (data: { username: string; country: string; city: string }) => {
    try {
      set({ isUpdating: true });
      const res = await updateProfile(data);
      set({ profile: res.data });
    } catch (error) {
      throw error;
    } finally {
      set({ isUpdating: false })
    }
  },
  clearProfile: () => {
    set({ profile: null });
  },

  toggleIsEditing: () => {
    set(state => ({ isEditing: !state.isEditing }));
  }
}))