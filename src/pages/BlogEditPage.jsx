import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../store/blogStore';
import { useAuth } from '../store/authStore';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Toast from '../components/Toast';
import constants from '../utils/constants';
import blogService from '../services/blogService';

const BlogEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, isLoading, error, fetchPosts, updatePost } = useBlog();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [toast, setToast] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts.length > 0 && id) {
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost.title || '');
        setContent(foundPost.content || '');
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);

    if (!post || !user) {
      setSaveError('Authentication required');
      setToast({ message: 'Authentication required', type: 'error' });
      setIsSaving(false);
      return;
    }

    try {
      await updatePost(post.id, {
        title,
        content,
        status: post.status || constants.DOCUMENT_STATUS.DRAFT
      });
      setToast({ message: 'Post saved successfully', type: 'success' });
    } catch (err) {
      setSaveError(err.message);
      setToast({ message: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!post || !user) return;

    try {
      await updatePost(post.id, {
        ...post,
        title,
        content,
        status: constants.DOCUMENT_STATUS.PUBLISHED
      });
      setToast({ message: 'Post published successfully', type: 'success' });
      navigate(`/posts/${post.id}`);
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
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const canEdit = isOwner || user?.role === constants.USER_ROLES.ADMIN;
  const isPublished = post.status === constants.DOCUMENT_STATUS.PUBLISHED;

  if (!canEdit) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Access Denied</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You don't have permission to edit this post.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card title="Edit Post">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              required
              fullWidth
              className="mb-4"
            />

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="block w-full rounded-md shadow-sm border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            {saveError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      {saveError}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Draft'
                )}
              </Button>
              {!isPublished && (
                <Button
                  type="button"
                  onClick={handlePublish}
                >
                  Publish
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

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

BlogEditPage.propTypes = {};

export default BlogEditPage;