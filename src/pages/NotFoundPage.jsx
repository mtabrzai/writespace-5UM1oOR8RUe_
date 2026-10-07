import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="text-center">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900">
            <svg
              className="h-6 w-6 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
            404 - Page Not Found
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-6">
            <Link to="/">
              <Button>
                Go to Homepage
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

NotFoundPage.propTypes = {};

export default NotFoundPage;