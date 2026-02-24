import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../utils/auth';
import { GraduationCap, Lock, Mail, AlertCircle } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = login(email, password);
    
    if (user) {
      // Redirigir según el rol del usuario
      if (user.rol === 'alumno' || user.rol === 'profesor' || user.rol === 'coordinador') {
        navigate('/pasantias');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Credenciales inválidas. Usa password: demo123');
    }
  };

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo y Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 dark:bg-green-600 rounded-full mb-4">
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-2">ConectaUP</h1>
          <p className="text-gray-600 dark:text-gray-400">Plataforma de Gestión de Prácticas Profesionales</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="usuario@ejemplo.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 dark:bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Accesos rápidos de demo */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Accesos de demostración:</p>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('juan.perez@estudiante.edu')}
              className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <span className="font-medium">Alumno:</span> juan.perez@estudiante.edu
            </button>
            <button
              onClick={() => quickLogin('maria.garcia@supervisor.edu')}
              className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <span className="font-medium">Profesor:</span> maria.garcia@supervisor.edu
            </button>
            <button
              onClick={() => quickLogin('carlos.lopez@coordinador.edu')}
              className="w-full text-left px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            >
              <span className="font-medium">Coordinador:</span> carlos.lopez@coordinador.edu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
