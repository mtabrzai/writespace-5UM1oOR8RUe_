import PropTypes from 'prop-types';

const constants = {
  DEFAULT_ADMIN: {
    id: 'admin',
    role: 'admin',
    email: 'admin@writespace.app'
  },
  USER_ROLES: {
    ADMIN: 'admin',
    EDITOR: 'editor',
    VIEWER: 'viewer'
  },
  DOCUMENT_STATUS: {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
  },
  MAX_FILE_SIZE_BYTES: parseInt(import.meta.env.VITE_MAX_FILE_SIZE_MB || '10', 10) * 1024 * 1024,
  ALLOWED_FILE_TYPES: import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(',') || ['.md', '.txt', '.docx'],
  DEFAULT_THEME: import.meta.env.VITE_DEFAULT_THEME || 'light',
  SESSION_TIMEOUT_MINUTES: parseInt(import.meta.env.VITE_SESSION_TIMEOUT_MINUTES || '30', 10),
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  AUTH_COOKIE_NAME: import.meta.env.VITE_AUTH_COOKIE_NAME || 'writespace_auth_token',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || ''
};

constants.propTypes = {
  DEFAULT_ADMIN: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string
  }),
  USER_ROLES: PropTypes.shape({
    ADMIN: PropTypes.string,
    EDITOR: PropTypes.string,
    VIEWER: PropTypes.string
  }),
  DOCUMENT_STATUS: PropTypes.shape({
    DRAFT: PropTypes.string,
    PUBLISHED: PropTypes.string,
    ARCHIVED: PropTypes.string
  }),
  MAX_FILE_SIZE_BYTES: PropTypes.number,
  ALLOWED_FILE_TYPES: PropTypes.arrayOf(PropTypes.string),
  DEFAULT_THEME: PropTypes.string,
  SESSION_TIMEOUT_MINUTES: PropTypes.number,
  API_BASE_URL: PropTypes.string,
  AUTH_COOKIE_NAME: PropTypes.string,
  ENABLE_ANALYTICS: PropTypes.bool,
  SENTRY_DSN: PropTypes.string
};

export default constants;