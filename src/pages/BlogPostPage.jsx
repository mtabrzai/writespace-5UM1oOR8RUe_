import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../store/blogStore';
import { useAuth } from '../store/authStore';
import Card from '../components/Card';
import Button from '../components/Button';
import dateUtils from '../utils/dateUtils';
import constants from '../utils/constants';
import blogService from '../services/blogService';
import Toast from '../components/Toast';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, isLoading, error, fetchPosts, updatePost, deletePost } = useBlog();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts.length > 0 && id) {
      const foundPost = posts.find(p => p.id === id);
      setPost(foundPost || null);
    }
  }, [posts, id]);

  useEffect(() => {
    const checkOwnership = async () => {
      if (!user || !id || !token) return;

      try {
        const ownership = await blogService.checkPostOwnership(id);
        setIsOwner(ownership);
      } catch (err) {
        console.error('Failed to check ownership:', err);
      }
    };

    checkOwnership();
  }, [user, id, token]);

  const handlePublish = async () => {
    if (!post) return;

    try {
      await updatePost(post.id, {
        ...post,
        status: constants.DOCUMENT_STATUS.PUBLISHED
      });
      setToast({ message: 'Post published successfully', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleUnpublish = async () => {
    if (!post) return;

    try {
      await updatePost(post.id, {
        ...post,
        status: constants.DOCUMENT_STATUS.DRAFT
      });
      setToast({ message: 'Post reverted to draft', type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    try {
      await deletePost(post.id);
      setToast({ message: 'Post deleted successfully', type: 'success' });
      navigate('/dashboard');
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Failed to load post: {error}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Post not found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                The post you're looking for doesn't exist or has been deleted.
              </p>
              <div className="mt-6">
                <Link to="/dashboard">
                  <Button>
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const canEdit = isOwner || user?.role === constants.USER_ROLES.ADMIN;
  const isPublished = post.status === constants.DOCUMENT_STATUS.PUBLISHED;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {post.title || 'Untitled Post'}
              </h1>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Updated {dateUtils.formatRelativeTime(post.updatedAt)}
                </span>
                <span className="mx-2">•</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {post.status || 'draft'}
                </span>
              </div>
            </div>
            {canEdit && (
              <div className="flex space-x-2">
                <Link to={`/documents/${post.id}`}>
                  <Button variant="secondary" size="small">
                    <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                    Edit
                  </Button>
                </Link>
                {!isPublished ? (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={handlePublish}
                  >
                    <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={handleUnpublish}
                  >
                    <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                    </svg>
                    Unpublish
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => setDeleteConfirm(true)}
                >
                  <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {post.content || 'No content'}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <Link to="/dashboard" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
              ← Back to Dashboard
            </Link>
          </div>
        </Card>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setDeleteConfirm(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                    Delete post
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className="ml-3"
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
};

BlogPostPage.propTypes = {};

export default BlogPostPage;