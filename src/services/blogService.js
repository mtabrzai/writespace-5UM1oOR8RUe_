import PropTypes from 'prop-types';
import { useAuth } from '../store/authStore';

const blogService = {
  getPosts: async () => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch posts');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to fetch posts');
    }
  },

  createPost: async (postData) => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create post');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to create post');
    }
  },

  updatePost: async (postId, postData) => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Failed to update post');
    }
  },

  deletePost: async (postId) => {
    const { token, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }

      return true;
    } catch (err) {
      throw new Error(err.message || 'Failed to delete post');
    }
  },

  checkPostOwnership: async (postId) => {
    const { token, user, checkSessionTimeout } = useAuth.getState();
    checkSessionTimeout();

    if (!token || !user) {
      throw new Error('Authentication required');
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/ownership`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to check post ownership');
      }

      const data = await response.json();
      return data.isOwner;
    } catch (err) {
      throw new Error(err.message || 'Failed to check post ownership');
    }
  }
};

blogService.propTypes = {
  getPosts: PropTypes.func,
  createPost: PropTypes.func,
  updatePost: PropTypes.func,
  deletePost: PropTypes.func,
  checkPostOwnership: PropTypes.func
};

export default blogService;