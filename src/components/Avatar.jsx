import PropTypes from 'prop-types';

const Avatar = ({ name, role, size = 'medium', className = '' }) => {
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8 w-8 text-sm';
      case 'medium':
        return 'h-10 w-10 text-base';
      case 'large':
        return 'h-12 w-12 text-lg';
      default:
        return 'h-10 w-10 text-base';
    }
  };

  const getRoleIcon = () => {
    if (role === 'admin') {
      return (
        <svg
          className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h1V3a1 1 0 011-1zm0 5h10V5H5v2zm0 4h10v-2H5v2zm0 4h6v-2H5v2z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${getSizeClasses()} rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 ${className}`}>
      <span className="font-medium">{getInitials(name)}</span>
      {getRoleIcon()}
    </div>
  );
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string
};

export default Avatar;