import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import dateUtils from '../utils/dateUtils';
import constants from '../utils/constants';

const PostCard = ({
  post,
  showAuthor = true,
  showStatus = true,
  showActions = false,
  onDelete
}) => {
  if (!post) return null;

  const isPublished = post.status === constants.DOCUMENT_STATUS.PUBLISHED;

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      <div className="flex-1">
        <Link to={`/documents/${post.id}`} className="block">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {post.title || 'Untitled Post'}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {post.content ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '') : 'No content'}
          </p>
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            {showAuthor && post.author && (
              <>
                <Avatar name={post.author.name} size="small" />
                <span>{post.author.name}</span>
              </>
            )}
            <span>
              Updated {dateUtils.formatRelativeTime(post.updatedAt)}
            </span>
          </div>
          {showStatus && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
              {post.status || 'draft'}
            </span>
          )}
        </div>

        {showActions && (
          <div className="mt-4 flex justify-end space-x-2">
            <Link to={`/documents/${post.id}`}>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
              >
                <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                </svg>
                Edit
              </button>
            </Link>
            <button
              type="button"
              onClick={() => onDelete && onDelete(post.id)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
            >
              <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    status: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired,
  showAuthor: PropTypes.bool,
  showStatus: PropTypes.bool,
  showActions: PropTypes.bool,
  onDelete: PropTypes.func
};

export default PostCard;