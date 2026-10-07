# Deployment Guide

This guide provides instructions for deploying writespace to Vercel and configuring the necessary environment variables.

## Prerequisites

- Vercel account ([sign up here](https://vercel.com/signup))
- GitHub, GitLab, or Bitbucket account
- Node.js (v18 or later)
- npm (v8 or later)

## Vercel Deployment

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fwritespace&env=VITE_API_BASE_URL,VITE_AUTH_COOKIE_NAME,VITE_SESSION_TIMEOUT_MINUTES,VITE_MAX_FILE_SIZE_MB,VITE_ALLOWED_FILE_TYPES,VITE_DEFAULT_THEME,VITE_ENABLE_ANALYTICS,VITE_SENTRY_DSN&envDescription=Environment%20variables%20required%20for%20writespace%20to%20function%20properly&envLink=https%3A%2F%2Fgithub.com%2Fyour-username%2Fwritespace%2Fblob%2Fmain%2F.env.example)

### Method 2: Manual Deployment

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Log in to Vercel**:
```bash
vercel login
```

3. **Deploy the project**:
```bash
vercel
```

4. **Follow the prompts** to link your project to Vercel.

5. **Set up environment variables** (see Environment Variables section below).

6. **Deploy to production**:
```bash
vercel --prod
```

## Environment Variables

Create a `.env` file in your project root based on `.env.example`. The following environment variables are required:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Base URL for API endpoints | `https://api.writespace.app/api` |
| `VITE_AUTH_COOKIE_NAME` | Name of the authentication cookie | `writespace_auth_token` |
| `VITE_SESSION_TIMEOUT_MINUTES` | Session timeout duration in minutes | `30` |
| `VITE_MAX_FILE_SIZE_MB` | Maximum file upload size in MB | `10` |
| `VITE_ALLOWED_FILE_TYPES` | Allowed file extensions for uploads | `.md,.txt,.docx` |
| `VITE_DEFAULT_THEME` | Default theme (light/dark) | `light` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | `false` |
| `VITE_SENTRY_DSN` | Sentry DSN for error tracking | (empty or your Sentry DSN) |

### Setting Environment Variables in Vercel

1. **Go to your project dashboard** on Vercel.

2. **Navigate to Settings** > **Environment Variables**.

3. **Add each environment variable** with its corresponding value.

4. **For production deployments**, ensure you add the variables to the Production environment.

## Custom Domain

1. **Go to your project dashboard** on Vercel.

2. **Navigate to Settings** > **Domains**.

3. **Add your custom domain** and follow the verification steps.

4. **Update DNS settings** with your domain registrar as instructed by Vercel.

## Continuous Deployment

1. **Connect your Git repository** to Vercel:
   - Go to your project dashboard
   - Click on "Git" tab
   - Connect your GitHub, GitLab, or Bitbucket account
   - Select the repository and branch

2. **Configure deployment settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Enable automatic deployments** for your production branch.

## Troubleshooting

### Common Issues

1. **Build fails**:
   - Ensure all environment variables are set
   - Check Node.js version compatibility
   - Verify package.json scripts are correct

2. **API not working**:
   - Verify `VITE_API_BASE_URL` points to the correct API endpoint
   - Check CORS settings on your API server

3. **Authentication issues**:
   - Verify `VITE_AUTH_COOKIE_NAME` matches your backend
   - Check session timeout settings

4. **Static files not loading**:
   - Ensure the build output directory is set to `dist`
   - Verify the Vercel project settings match your build configuration

### Logs

View deployment logs in the Vercel dashboard:
1. Go to your project
2. Click on the "Deployments" tab
3. Select the deployment to view logs

## Rollback

To rollback to a previous deployment:
1. Go to your project dashboard
2. Click on the "Deployments" tab
3. Find the deployment you want to rollback to
4. Click the "..." menu and select "Promote to Production"

## Monitoring

1. **Vercel Analytics**: Enabled by default in your project dashboard
2. **Sentry**: Configured via `VITE_SENTRY_DSN` environment variable
3. **Custom Monitoring**: Set up additional monitoring as needed for your API backend