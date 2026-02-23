import React from "react";
import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { PracticasPage } from './components/PracticasPage';
import { PracticaDetail } from './components/PracticaDetail';
import { PeriodosPage } from './components/PeriodosPage';
import { DocumentosPage } from './components/DocumentosPage';
import { PerfilPage } from './components/PerfilPage';
import { isAuthenticated } from './utils/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/practicas',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PracticasPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/practicas/:id',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PracticaDetail />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/periodos',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PeriodosPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/documentos',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <DocumentosPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/perfil',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <PerfilPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
