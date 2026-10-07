import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../store/authStore';

const PublicNavbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center text-xl font-bold text-gray-900"
            >
              writespace
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/login'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/register'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

PublicNavbar.propTypes = {};

export default PublicNavbar;