import React from "react";
import { getCurrentUser } from '../utils/auth';
import { mockPracticas, mockPeriodos } from '../utils/mockData';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  FileText,
  AlertCircle,
} from 'lucide-react';

export function Dashboard() {
  const user = getCurrentUser();
  
  if (!user) return null;

  const periodoActivo = mockPeriodos.find(p => p.activo);
  
  // Estadísticas según el rol
  const getStats = () => {
    if (user.rol === 'alumno') {
      const misPracticas = mockPracticas.filter(p => p.estudianteId === user.id);
      const aprobadas = misPracticas.filter(p => p.estado === 'aprobado').length;
      
      return [
        {
          label: 'Mis Pasantías',
          value: misPracticas.length,
          icon: Briefcase,
          color: 'bg-indigo-50 text-indigo-600',
        },
        {
          label: 'Aprobadas',
          value: aprobadas,
          icon: CheckCircle2,
          color: 'bg-green-50 text-green-600',
        },
      ];
    }
    
    if (user.rol === 'profesor') {
      const practicasSupervisadas = mockPracticas.filter(p => p.supervisorId === user.id);
      const pendientes = practicasSupervisadas.filter(p => p.estado === 'pendiente').length;
      const aprobadas = practicasSupervisadas.filter(p => p.estado === 'aprobado').length;
      const rechazadas = practicasSupervisadas.filter(p => p.estado === 'rechazado').length;
      
      return [
        {
          label: 'Total Supervisadas',
          value: practicasSupervisadas.length,
          icon: Users,
          color: 'bg-indigo-50 text-indigo-600',
        },
        {
          label: 'Pendientes',
          value: pendientes,
          icon: Clock,
          color: 'bg-yellow-50 text-yellow-600',
        },
        {
          label: 'Aprobadas',
          value: aprobadas,
          icon: CheckCircle2,
          color: 'bg-green-50 text-green-600',
        },
        {
          label: 'Rechazadas',
          value: rechazadas,
          icon: AlertCircle,
          color: 'bg-red-50 text-red-600',
        },
      ];
    }
    
    if (user.rol === 'coordinador') {
      const pendientes = mockPracticas.filter(p => p.estado === 'pendiente').length;
      const aprobadas = mockPracticas.filter(p => p.estado === 'aprobado').length;
      
      return [
        {
          label: 'Total Prácticas',
          value: mockPracticas.length,
          icon: Briefcase,
          color: 'bg-indigo-50 text-indigo-600',
        },
        {
          label: 'Pendientes',
          value: pendientes,
          icon: Clock,
          color: 'bg-yellow-50 text-yellow-600',
        },
        {
          label: 'Aprobadas',
          value: aprobadas,
          icon: CheckCircle2,
          color: 'bg-green-50 text-green-600',
        },
        {
          label: 'Período Actual',
          value: periodoActivo?.nombre || 'N/A',
          icon: Calendar,
          color: 'bg-purple-50 text-purple-600',
        },
      ];
    }

    return [];
  };

  const stats = getStats();

  // Prácticas recientes según el rol
  const getPracticasRecientes = () => {
    if (user.rol === 'alumno') {
      return mockPracticas.filter(p => p.estudianteId === user.id);
    }
    if (user.rol === 'profesor') {
      return mockPracticas.filter(p => p.supervisorId === user.id);
    }
    return mockPracticas;
  };

  const practicasRecientes = getPracticasRecientes().slice(0, 5);

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'actualizar':
        return 'bg-blue-100 text-blue-700';
      case 'aprobado':
        return 'bg-green-100 text-green-700';
      case 'rechazado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      'pendiente': 'Pendiente',
      'actualizar': 'Actualizar',
      'aprobado': 'Aprobado',
      'rechazado': 'Rechazado',
    };
    return labels[estado] || estado.charAt(0).toUpperCase() + estado.slice(1);
  };

  const getEstadoBadgeDark = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'actualizar':
        return 'bg-blue-900/30 text-blue-400';
      case 'aprobado':
        return 'bg-green-900/30 text-green-400';
      case 'rechazado':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-gray-600 dark:text-gray-400 mb-1">Bienvenido de nuevo,</p>
        <h1 className="font-bold text-gray-900 dark:text-gray-100">{user.nombre}</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${stat.color} dark:${stat.color.replace('indigo', 'green').replace('bg-indigo-50', 'bg-green-900/30').replace('text-indigo-600', 'text-green-400')}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
              <p className="font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Prácticas Recientes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-gray-100">
            {user.rol === 'alumno' ? 'Mis Prácticas' : 'Prácticas Recientes'}
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {practicasRecientes.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p>No hay prácticas registradas</p>
            </div>
          ) : (
            practicasRecientes.map((practica) => (
              <div key={practica.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{practica.estudianteNombre}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getEstadoBadge(practica.estado)} dark:${getEstadoBadgeDark(practica.estado)}`}>
                        {getEstadoLabel(practica.estado)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{practica.empresaNombre}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{practica.area}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Período Académico Activo */}
      {periodoActivo && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-green-600 dark:to-green-500 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold mb-2">Período Académico Activo</h3>
              <p className="text-indigo-100 dark:text-green-100 mb-3">{periodoActivo.nombre}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(periodoActivo.fechaInicio).toLocaleDateString('es-ES')} - 
                    {' '}{new Date(periodoActivo.fechaFin).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{periodoActivo.totalPracticas} prácticas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
