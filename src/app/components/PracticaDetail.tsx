import React from "react";
import { useParams, useNavigate } from 'react-router';
import { mockPracticas } from '../utils/mockData';
import { getCurrentUser } from '../utils/auth';
import {
  ArrowLeft,
  Building2,
  User,
  Calendar,
  MapPin,
  Edit,
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Carrera</p>
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
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Descripción</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Descripción General</p>
                  <p className="text-gray-900 dark:text-gray-100 leading-relaxed">{practica.descripcion}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objetivos de la Pasantía</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                      <li>Desarrollar habilidades prácticas en la carrera de {practica.area}</li>
                      <li>Aplicar conocimientos teóricos en un entorno profesional real</li>
                      <li>Contribuir al desarrollo de proyectos empresariales</li>
                      <li>Establecer conexiones profesionales en el sector</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Responsabilidades</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                      <li>Colaborar en proyectos asignados por el supervisor</li>
                      <li>Participar en reuniones y actividades del equipo</li>
                      <li>Mantener comunicación constante con el supervisor académico</li>
                      <li>Cumplir con los horarios y compromisos establecidos</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requisitos</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Estudiante activo en la carrera de {practica.area}</li>
                    <li>Disponibilidad para cumplir con {practica.horasRequeridas} horas de práctica</li>
                    <li>Compromiso y responsabilidad en el desarrollo de las actividades</li>
                    <li>Habilidades básicas en las tecnologías relacionadas al área</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
