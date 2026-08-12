import { deleteUser, getAllUsers } from "@/api/users";
import type { User } from "@/types/user";
import { toast } from "react-toastify";
import { create } from "zustand";


interface UsersState {
  users: User[];
  isLoading: boolean;

  getUsers: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  clearUsers: () => void;
}

export const useUsersStore = create<UsersState>(set => ({
  users: [],
  isLoading: false,

  getUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await getAllUsers();
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      set({ isLoading: true });
      await deleteUser(id);
      set(state => ({
        users: state.users.filter(user => user.id !== id)
      }))
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  clearUsers: () => {
    set({ users: [] });
  }
}))