import React from "react";
import { useParams, useNavigate } from 'react-router';
import { mockPracticas } from '../utils/mockData';
import { getCurrentUser } from '../utils/auth';
import {
  ArrowLeft,
  Building2,
  User,
  Calendar,
  Clock,
  MapPin,
  Edit,
  TrendingUp,
} from 'lucide-react';

export function PracticaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const practica = mockPracticas.find(p => p.id === id);

  const getBackPath = () => {
    if (user?.rol === 'alumno') {
      return '/pasantias';
    }
    return '/practicas';
  };

  if (!practica || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Práctica no encontrada</p>
        <button
          onClick={() => navigate(getBackPath())}
          className="mt-4 text-indigo-600 dark:text-green-400 hover:text-indigo-700 dark:hover:text-green-500"
        >
          Volver a {user?.rol === 'alumno' ? 'Pasantías' : 'Prácticas'}
        </button>
      </div>
    );
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'en_progreso':
        return 'bg-indigo-100 text-indigo-700';
      case 'completada':
        return 'bg-green-100 text-green-700';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelada':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getEstadoLabel = (estado: string) => {
    return estado.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getEstadoBadgeDark = (estado: string) => {
    const lightBadge = getEstadoBadge(estado);
    return lightBadge.replace('indigo', 'green').replace('bg-indigo-100', 'bg-green-900/30').replace('text-indigo-700', 'text-green-400');
  };

  const progreso = Math.round((practica.horasCompletadas / practica.horasRequeridas) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(getBackPath())}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-bold text-gray-900 dark:text-gray-100">Detalle de Práctica</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(practica.estado)} dark:${getEstadoBadgeDark(practica.estado)}`}>
                {getEstadoLabel(practica.estado)}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{practica.estudianteNombre}</p>
          </div>
        {(user.rol === 'coordinador' || user.rol === 'profesor') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
          {/* Detalles Generales */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Información General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estudiante</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">{practica.estudianteNombre}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Empresa</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">{practica.empresaNombre}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Supervisor Académico</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">{practica.supervisorNombre}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Área</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">{practica.area}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fecha de Inicio</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(practica.fechaInicio).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fecha de Finalización</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(practica.fechaFin).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Descripción</p>
              <p className="text-gray-900 dark:text-gray-100">{practica.descripcion}</p>
            </div>
          </div>

          {/* Progreso de Horas */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Progreso de Horas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">Avance General</span>
                </div>
                <span className="text-2xl font-bold text-indigo-600 dark:text-green-400">{progreso}%</span>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-green-600 dark:to-green-500 rounded-full transition-all"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Requeridas</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="font-bold text-gray-900 dark:text-gray-100">{practica.horasRequeridas}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completadas</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="font-bold text-green-600 dark:text-green-400">{practica.horasCompletadas}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Restantes</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <p className="font-bold text-orange-600 dark:text-orange-400">
                      {practica.horasRequeridas - practica.horasCompletadas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
