import { addPost, getMyPosts, getPosts, updatePost, deletePost } from "@/api/posts";
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
  selectedPostId: number | null;

  setPostForm: (data: Partial<PostForm>) => void;
  clearPostForm: () => void;
  setSelectedPostId: (id: number | null) => void;
  setPostFormFromPost: (post: Post) => void;

  getPosts: () => Promise<void>;
  getMyPosts: () => Promise<void>;

  addPost: () => Promise<void>;
  updatePost: () => Promise<void>;
  deletePost: (id: number) => Promise<void>;

  updateLike: (postId: number, increment: number) => void;
  toggleLike: (postId: number, isLiked: boolean) => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,
  selectedPostId: null,

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
    const { postForm } = get();
    postForm.images.forEach(img => {
      if (!img.isExisting) {
        URL.revokeObjectURL(img.image);
      }
    });

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

  setSelectedPostId: (id) => {
    set({ selectedPostId: id });
  },

  setPostFormFromPost: (post) => {
    const photos: Photo[] = post.images.map((img, index) => {
      const file = new File([], `existing-image-${index}.jpg`, { type: 'image/jpeg' });

      return {
        id: `existing-${index}-${Date.now()}`,
        file: file,
        image: `http://localhost:5000${img}`,
        isExisting: true,
        existingUrl: img,
      };
    });

    set({
      postForm: {
        title: post.title,
        description: post.description,
        images: photos,
        country: post.country,
        city: post.city,
      },
      selectedPostId: post.id
    });
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

      postForm.images.forEach(img => {
        formData.append('images', img.file);
      });

      await addPost(formData);
      await get().getPosts();

      get().clearPostForm();
    } finally {
      set({ isLoading: false });
    }
  },

  updatePost: async () => {
    try {
      set({ isLoading: true });

      const { postForm, selectedPostId } = get();

      if (!selectedPostId) {
        throw new Error('No post selected for update');
      }

      const formData = new FormData();
      formData.append('title', postForm.title);
      formData.append('description', postForm.description);
      formData.append('country', postForm.country);
      formData.append('city', postForm.city);

      const existingUrls = postForm.images
        .filter(img => img.isExisting && img.existingUrl)
        .map(img => img.existingUrl);

      if (existingUrls.length > 0) {
        formData.append('existingImages', JSON.stringify(existingUrls));
      }

      const newImages = postForm.images.filter(img => !img.isExisting);
      newImages.forEach(img => {
        formData.append('images', img.file);
      });

      console.log('Updating post:');
      console.log('Existing images:', existingUrls);
      console.log('New images count:', newImages.length);

      await updatePost(selectedPostId, formData);
      await get().getPosts();

      get().clearPostForm();
      set({ selectedPostId: null });
    } finally {
      set({ isLoading: false });
    }
  },

  deletePost: async (id: number) => {
    try {
      set({ isLoading: true });
      await deletePost(id);
      await get().getPosts();
    } finally {
      set({ isLoading: false });
    }
  },

  updateLike: (postId, increment) => {
    set(state => ({
      posts: state.posts.map(post => post.id === postId ? {
        ...post, _count: {
          ...post._count,
          likes: Math.max(0, post._count.likes + increment)
        }
      } : post)
    }))
  },
  toggleLike: (postId, isLiked) => {
    set(state => ({
      posts: state.posts.map(post => post.id === postId ? { ...post, isLiked } : post)
    }))
  }
}))