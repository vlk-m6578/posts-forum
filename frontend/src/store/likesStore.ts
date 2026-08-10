import { addLike, removeLike } from "@/api/likes";
import { toast } from "react-toastify";
import { create } from "zustand";


interface LikesState {
  isLoading: boolean;

  addLike: (postId: number) => Promise<void>;
  removeLike: (postId: number) => Promise<void>;
}

export const useLikesStore = create<LikesState>((set) => ({
  isLoading: false,

  addLike: async (postId) => {
    try {
      set({ isLoading: true });
      await addLike(postId);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: true });
    }
  },
  removeLike: async (postId) => {
    try {
      set({ isLoading: true });
      await removeLike(postId);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  }
}))