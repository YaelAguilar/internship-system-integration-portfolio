import React, { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { getCurrentUser, logout } from '../utils/auth';
import {
  Briefcase,
  Calendar,
  LogOut,
  GraduationCap,
  Menu,
  Sun,
  Moon,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from './ui/switch';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const navItems = [
    { path: '/pasantias', label: 'Pasantías', icon: Briefcase, roles: ['alumno', 'profesor', 'coordinador', 'empresa'] },
    { path: '/pasantias/nueva', label: 'Nueva Pasantía', icon: Plus, roles: ['alumno'] },
    { path: '/periodos', label: 'Períodos', icon: Calendar, roles: ['coordinador'] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.rol));

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'alumno': return 'bg-blue-100 text-blue-700';
      case 'profesor': return 'bg-green-100 text-green-700';
      case 'coordinador': return 'bg-purple-100 text-purple-700';
      case 'empresa': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sidebar - Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 dark:bg-green-600 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">ConectaUP</span>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-green-500 dark:to-green-600 rounded-full flex items-center justify-center text-white font-medium">
                {user.nombre.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{user.nombre}</p>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(user.rol)}`}>
                  {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-green-900/30 text-indigo-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Logout */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isDark ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </div>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 dark:bg-green-600 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-100">ConectaUP</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-2 py-2 sm:py-3 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="px-3 py-2 mb-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">{user.nombre}</p>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor(user.rol)}`}>
                {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}
              </span>
            </div>
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-green-900/30 text-indigo-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-3">
                {isDark ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {isDark ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </div>
              <Switch
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="md:pl-64">
        <div className="px-3 sm:px-4 py-4 sm:py-6 md:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
