import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useBlog } from '../store/blogStore';
import { useEffect } from 'react';
import dateUtils from '../utils/dateUtils';

const LatestPostsPreview = () => {
  const { posts, isLoading, error, fetchPosts } = useBlog();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Latest Posts
            </h2>
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Latest Posts
            </h2>
            <p className="mt-2 text-red-500 dark:text-red-400">
              Failed to load posts: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const latestPosts = posts
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  if (latestPosts.length === 0) {
    return (
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Latest Posts
            </h2>
            <p className="mt-2 text-xl text-gray-500 dark:text-gray-300">
              No posts available
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Latest Posts
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Recent updates
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Check out what's new in our community
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {latestPosts.map((post) => (
            <div key={post.id} className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <Link to={`/documents/${post.id}`} className="block">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title || 'Untitled Post'}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {post.content ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '') : 'No content'}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Updated {dateUtils.formatRelativeTime(post.updatedAt)}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {post.status || 'draft'}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            View all posts <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

LatestPostsPreview.propTypes = {};

export default LatestPostsPreview;