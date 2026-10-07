# writespace

writespace is a collaborative writing platform that enables teams to create, edit, and share documents in real-time. Built with modern web technologies, writespace provides a seamless experience for writers, editors, and teams to work together efficiently.

## Features

- **Real-time Collaboration**: Work together with your team in real-time with instant updates
- **Rich Text Editing**: Markdown support, formatting options, and media embedding
- **Secure & Private**: End-to-end encryption and granular access controls
- **User Management**: Role-based permissions (Admin, Editor, Viewer)
- **Post Management**: Create, edit, publish, and delete documents
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Theme support for comfortable writing

## Tech Stack

- **Frontend**: React + Vite + JavaScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Authentication**: JWT with cookie-based sessions
- **API**: RESTful endpoints (mock implementation)
- **Testing**: Vitest + @testing-library/react
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/writespace.git
cd writespace
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

### Configuration

Environment variables (`.env` file):

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Base URL for API endpoints | `http://localhost:3000/api` |
| `VITE_AUTH_COOKIE_NAME` | Name of the authentication cookie | `writespace_auth_token` |
| `VITE_SESSION_TIMEOUT_MINUTES` | Session timeout duration in minutes | `30` |
| `VITE_MAX_FILE_SIZE_MB` | Maximum file upload size in MB | `10` |
| `VITE_ALLOWED_FILE_TYPES` | Allowed file extensions for uploads | `.md,.txt,.docx` |
| `VITE_DEFAULT_THEME` | Default theme (light/dark) | `light` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | `false` |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking | (empty) |

## Folder Structure

```
writespace/
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment configuration
├── vite.config.js          # Vite configuration
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   ├── index.css           # Global styles
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # API service modules
│   ├── store/              # Zustand stores
│   ├── utils/              # Utility functions
│   └── routes.jsx          # Application routes
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: manage users, create/edit/delete all posts |
| **Editor** | Create/edit/delete own posts, view all posts |
| **Viewer** | View published posts only |

## Document Statuses

| Status | Description |
|--------|-------------|
| **Draft** | Document is in progress and not visible to others |
| **Published** | Document is visible to authorized users |
| **Archived** | Document is no longer active but retained for reference |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.