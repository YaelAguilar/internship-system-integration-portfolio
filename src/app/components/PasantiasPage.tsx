import React, { useState } from 'react';
import { Link } from 'react-router';
import { getCurrentUser } from '../utils/auth';
import { mockPracticas } from '../utils/mockData';
import {
  Search,
  Filter,
  Briefcase,
  Building2,
  Calendar,
  User,
} from 'lucide-react';

export function PasantiasPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');

  if (!user) return null;

  // Filtrar pasantías según el rol
  let pasantias = [];
  if (user.rol === 'alumno') {
    pasantias = mockPracticas.filter(p => p.estudianteId === user.id);
  } else if (user.rol === 'profesor') {
    pasantias = mockPracticas.filter(p => p.supervisorId === user.id);
  } else if (user.rol === 'coordinador') {
    // Coordinadores ven todas las pasantías
    pasantias = mockPracticas;
  }

  // Aplicar filtros
  if (searchTerm) {
    pasantias = pasantias.filter(p =>
      p.estudianteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterEstado !== 'todos') {
    pasantias = pasantias.filter(p => p.estado === filterEstado);
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'actualizar':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'aprobado':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'rechazado':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
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

  const estadoOptions = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'actualizar', label: 'Actualizar' },
    { value: 'aprobado', label: 'Aprobado' },
    { value: 'rechazado', label: 'Rechazado' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
          {user.rol === 'alumno' ? 'Mis Pasantías' : 'Pasantías'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user.rol === 'alumno' 
            ? 'Gestiona tus pasantías profesionales' 
            : user.rol === 'profesor'
            ? 'Gestiona las pasantías que supervisas'
            : 'Gestiona las pasantías del sistema'}
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={user.rol === 'alumno' ? 'Buscar por empresa o carrera...' : 'Buscar por estudiante, empresa o carrera...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="relative w-full sm:w-auto sm:min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              {estadoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Pasantías */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {pasantias.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">No se encontraron pasantías</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterEstado !== 'todos'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no tienes pasantías registradas'}
            </p>
          </div>
        ) : (
          pasantias.map((pasantia) => (
            <Link
              key={pasantia.id}
              to={`/pasantias/${pasantia.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg hover:border-indigo-200 dark:hover:border-green-500 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 truncate">{pasantia.empresaNombre}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">{pasantia.area}</p>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getEstadoBadge(pasantia.estado)}`}>
                  {getEstadoLabel(pasantia.estado)}
                </span>
              </div>

              {/* Detalles */}
              <div className="space-y-2">
                {(user.rol === 'profesor' || user.rol === 'coordinador') && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">Estudiante: {pasantia.estudianteNombre}</span>
                  </div>
                )}
                {user.rol === 'alumno' && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">Supervisor: {pasantia.supervisorNombre}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">
                    {new Date(pasantia.fechaInicio).toLocaleDateString('es-ES')} - 
                    {' '}{new Date(pasantia.fechaFin).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
