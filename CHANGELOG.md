# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2023-11-15

### Added
- Initial project setup with Vite + React
- Authentication system with JWT and cookie-based sessions
- User management with role-based access control (Admin, Editor, Viewer)
- Document management with status tracking (Draft, Published, Archived)
- Real-time collaboration features
- Rich text editing with markdown support
- Responsive design with Tailwind CSS
- Dark mode support
- Environment configuration with `.env` variables
- Comprehensive testing setup with Vitest
- Error tracking with Sentry integration
- Analytics support (configurable)
- File upload restrictions (size and type)
- Session timeout handling
- Public landing page with features overview
- Dashboard for post management
- Document editor with save/publish functionality
- User profile and avatar display
- Toast notifications for user feedback
- Form validation and error handling
- Loading states for async operations
- 404 page for unknown routes
- Admin dashboard with user management and statistics
- Post ownership verification
- Date formatting utilities
- Constants for application-wide values
- Data service for localStorage operations
- API services for authentication, blog, and admin endpoints

### Changed
- N/A (Initial release)

### Deprecated
- N/A (Initial release)

### Removed
- N/A (Initial release)

### Fixed
- N/A (Initial release)

### Security
- JWT authentication with secure cookie storage
- Role-based access control for sensitive operations
- Input validation and sanitization
- Secure API endpoints with token verification
- Session timeout protection