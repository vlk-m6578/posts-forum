import { getMyPosts, getPosts } from "@/api/posts";
import type { Photo } from "@/types/photo";
import type { Post } from "@/types/post";
import { create } from "zustand";

interface PostForm {
  title: string;
  description: string;
  images: Photo[];
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  postForm: PostForm;

  setPostForm: (data: Partial<PostForm>) => void;
  clearPostForm: () => void;

  getPosts: () => Promise<void>;
  getMyPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  isLoading: false,

  postForm: {
    title: '',
    description: '',
    images: [],
  },

  setPostForm: (data) => {
    set(state => ({
      postForm: {
        ...state.postForm,
        ...data,
      }
    }))
  },
  clearPostForm: () => {
    set({
      postForm: {
        title: '',
        description: '',
        images: [],
      }
    })
  },

  getPosts: async () => {
    try {
      set({ isLoading: true });
      const res = await getPosts();

      set({
        posts: res.data,
      })
    } finally {
      set({ isLoading: false })
    }
  },
  getMyPosts: async () => {
    try {
      set({ isLoading: true });

      const res = await getMyPosts();

      set({
        posts: res.data,
      })
    } finally {
      set({ isLoading: false })
    }
  }
}))
