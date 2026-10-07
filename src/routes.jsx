import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DocumentEditorPage from './pages/DocumentEditorPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/documents/:id" element={<DocumentEditorPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;