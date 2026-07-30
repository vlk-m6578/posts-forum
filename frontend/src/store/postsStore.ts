import { addPost, getMyPosts, getPosts } from "@/api/posts";
import type { Photo } from "@/types/photo";
import type { Post } from "@/types/post";
import { create } from "zustand";

interface PostForm {
  title: string;
  description: string;
  images: Photo[];
  country: string;
  city: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  postForm: PostForm;

  setPostForm: (data: Partial<PostForm>) => void;
  clearPostForm: () => void;

  getPosts: () => Promise<void>;
  getMyPosts: () => Promise<void>;

  addPost: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,

  postForm: {
    title: '',
    description: '',
    images: [],
    country: '',
    city: '',
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
        country: '',
        city: '',
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
  },

  addPost: async () => {
    try {
      set({ isLoading: true });

      const { postForm } = get();

      const formData = new FormData();
      formData.append('title', postForm.title);
      formData.append('description', postForm.description);
      formData.append('country', postForm.country);
      formData.append('city', postForm.city);

      postForm.images.forEach(img => formData.append('images', img.file));

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await addPost(formData);
      await get().getPosts();

      get().clearPostForm();
    } finally {
      set({ isLoading: false });
    }
  }
}))
