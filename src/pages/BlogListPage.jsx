import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useBlog } from '../store/blogStore';
import { useAuth } from '../store/authStore';
import Card from '../components/Card';
import Button from '../components/Button';
import dateUtils from '../utils/dateUtils';
import constants from '../utils/constants';

const BlogListPage = () => {
  const { posts, isLoading, error, fetchPosts, createPost, deletePost } = useBlog();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    try {
      const newPost = await createPost({
        title: 'Untitled Post',
        content: '',
        status: constants.DOCUMENT_STATUS.DRAFT
      });
      window.location.href = `/documents/${newPost.id}`;
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h1>
          </div>
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Failed to load posts: {error}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const canCreatePost = user?.role === constants.USER_ROLES.ADMIN || user?.role === constants.USER_ROLES.EDITOR;
  const filteredPosts = user?.role === constants.USER_ROLES.ADMIN
    ? posts
    : posts.filter(post => post.authorId === user?.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h1>
          {canCreatePost && (
            <Button onClick={handleCreatePost}>
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </Button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No posts</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {canCreatePost ? 'Get started by creating a new post.' : 'You don\'t have any posts yet.'}
            </p>
            {canCreatePost && (
              <div className="mt-6">
                <Button onClick={handleCreatePost}>
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Post
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <Link to={`/documents/${post.id}`} className="block">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {post.title || 'Untitled Post'}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                        {post.content || 'No content'}
                      </p>
                    </Link>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Updated {dateUtils.formatRelativeTime(post.updatedAt)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                        {post.status || 'draft'}
                      </span>
                    </div>
                    {(user?.role === constants.USER_ROLES.ADMIN || post.authorId === user?.id) && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <Link to={`/documents/${post.id}`}>
                          <Button variant="secondary" size="small">
                            <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                            </svg>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

BlogListPage.propTypes = {};

export default BlogListPage;