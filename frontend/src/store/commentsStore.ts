import { createComment, deleteComment, getComments } from "@/api/comments";
import type { Comment, CommentData } from "@/types/comment";
import { toast } from "react-toastify";
import { create } from "zustand";


interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  isSubmitting: boolean;

  getComments: (postId: number) => Promise<void>;
  createComment: (data: CommentData) => Promise<void>;
  deleteComment: (commentId: number) => Promise<void>;
  clearComments: () => void;
}

export const useCommentsStore = create<CommentsState>((set, get) => ({
  comments: [],
  isLoading: false,
  isSubmitting: false,

  getComments: async (postId) => {
    try {
      set({ isLoading: true });
      const res = await getComments(postId);
      set({ comments: res.data });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  createComment: async (data) => {
    try {
      set({ isLoading: true });
      const res = await createComment(data);
      set(state => ({
        comments: [...state.comments, res.data]
      }))
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteComment: async (commentId) => {
    try {
      set({ isLoading: true });
      await deleteComment(commentId);
      set(state => ({
        comments: state.comments.filter(comment => comment.id !== commentId)
      }))
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
  clearComments: () => {
    set({ comments: [] });
  }
}))