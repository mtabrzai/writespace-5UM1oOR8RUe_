import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import PropTypes from 'prop-types';
import { useAuth } from './authStore';

const useBlogStore = create(
  persist(
    (set, get) => ({
      posts: [],
      isLoading: false,
      error: null,

      fetchPosts: async () => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
          }

          const data = await response.json();
          set({ posts: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      createPost: async (postData) => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          });

          if (!response.ok) {
            throw new Error(`Failed to create post: ${response.statusText}`);
          }

          const data = await response.json();
          set((state) => ({
            posts: [...state.posts, data],
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      updatePost: async (postId, postData) => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
          });

          if (!response.ok) {
            throw new Error(`Failed to update post: ${response.statusText}`);
          }

          const data = await response.json();
          set((state) => ({
            posts: state.posts.map(post => post.id === postId ? data : post),
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      deletePost: async (postId) => {
        const { token, checkSessionTimeout } = useAuth.getState();
        checkSessionTimeout();

        if (!token) {
          set({ error: 'Authentication required', isLoading: false });
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.statusText}`);
          }

          set((state) => ({
            posts: state.posts.filter(post => post.id !== postId),
            isLoading: false
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'writespace_blog_store',
      partialize: (state) => ({
        posts: state.posts
      })
    }
  )
);

export const useBlog = () => {
  const store = useBlogStore();
  return {
    posts: store.posts,
    isLoading: store.isLoading,
    error: store.error,
    fetchPosts: store.fetchPosts,
    createPost: store.createPost,
    updatePost: store.updatePost,
    deletePost: store.deletePost,
    clearError: store.clearError
  };
};

useBlog.propTypes = {
  children: PropTypes.node
};

export default useBlogStore;