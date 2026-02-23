import React from "react";
import { getCurrentUser } from '../utils/auth';
import { Mail, Briefcase, Shield, Calendar } from 'lucide-react';

export function PerfilPage() {
  const user = getCurrentUser();

  if (!user) return null;

  const getRolInfo = (role: string) => {
    switch (role) {
      case 'estudiante':
        return {
          label: 'Estudiante',
          description: 'Acceso a tus prácticas profesionales y documentos',
          color: 'bg-blue-100 text-blue-700',
        };
      case 'supervisor':
        return {
          label: 'Supervisor Académico',
          description: 'Supervisión y seguimiento de prácticas profesionales',
          color: 'bg-green-100 text-green-700',
        };
      case 'coordinador':
        return {
          label: 'Coordinador',
          description: 'Gestión completa de prácticas y períodos académicos',
          color: 'bg-purple-100 text-purple-700',
        };
      case 'empresa':
        return {
          label: 'Empresa',
          description: 'Gestión de practicantes en la organización',
          color: 'bg-orange-100 text-orange-700',
        };
      default:
        return {
          label: role,
          description: 'Usuario del sistema',
          color: 'bg-gray-100 text-gray-700',
        };
    }
  };

  const rolInfo = getRolInfo(user.rol);

  const permisosPorRol = {
    estudiante: [
      'Ver mis prácticas profesionales',
      'Registrar horas de práctica',
      'Descargar documentos generados',
      'Actualizar información personal',
    ],
    supervisor: [
      'Supervisar prácticas asignadas',
      'Evaluar desempeño de estudiantes',
      'Generar informes de seguimiento',
      'Aprobar horas registradas',
    ],
    coordinador: [
      'Administrar todas las prácticas',
      'Gestionar períodos académicos',
      'Crear y asignar supervisores',
      'Generar reportes estadísticos',
      'Configurar parámetros del sistema',
    ],
    empresa: [
      'Ver practicantes asignados',
      'Registrar evaluaciones',
      'Actualizar información de la empresa',
    ],
  };

  const permisos = permisosPorRol[user.rol as keyof typeof permisosPorRol] || [];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-bold text-gray-900 mb-1">Mi Perfil</h1>
        <p className="text-gray-600">Información de tu cuenta y permisos</p>
      </div>

      {/* Información del Usuario */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <span className="text-3xl font-bold">{user.nombre.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 mb-2">{user.nombre}</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-600" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${rolInfo.color}`}>
                  {rolInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rol y Permisos */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Rol y Permisos</h2>
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">{rolInfo.label}</p>
              <p className="text-sm text-gray-600">{rolInfo.description}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Permisos asignados:</p>
          <ul className="space-y-2">
            {permisos.map((permiso, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 flex-shrink-0" />
                <span>{permiso}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sistema RBAC Info */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-indigo-900 mb-1">Control de Acceso Basado en Roles (RBAC)</p>
            <p className="text-sm text-indigo-700">
              El sistema utiliza RBAC con autenticación JWT para controlar el acceso a las diferentes
              funcionalidades según tu rol. Las rutas y permisos se gestionan dinámicamente.
            </p>
          </div>
        </div>
      </div>

      {/* Información de la Sesión */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Información de Sesión</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">ID de Usuario</span>
            <span className="font-mono text-gray-900">{user.id}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">Tipo de Autenticación</span>
            <span className="font-medium text-gray-900">JWT Token</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Última Actualización</span>
            <div className="flex items-center gap-2 text-gray-900">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
