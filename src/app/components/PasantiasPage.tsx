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
  TrendingUp,
} from 'lucide-react';

export function PasantiasPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');

  if (!user) return null;

  // Filtrar solo las pasantías del alumno
  let pasantias = mockPracticas.filter(p => p.estudianteId === user.id);

  // Aplicar filtros
  if (searchTerm) {
    pasantias = pasantias.filter(p =>
      p.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterEstado !== 'todos') {
    pasantias = pasantias.filter(p => p.estado === filterEstado);
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'en_progreso':
        return 'bg-indigo-100 text-indigo-700 dark:bg-green-900/30 dark:text-green-400';
      case 'completada':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelada':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getEstadoLabel = (estado: string) => {
    return estado.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const estadoOptions = [
    { value: 'todos', label: 'Todos los estados' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Mis Pasantías</h1>
        <p className="text-gray-600 dark:text-gray-400">Gestiona tus pasantías profesionales</p>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por empresa o área..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-indigo-200 dark:hover:border-green-500 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{pasantia.empresaNombre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pasantia.area}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getEstadoBadge(pasantia.estado)}`}>
                  {getEstadoLabel(pasantia.estado)}
                </span>
              </div>

              {/* Detalles */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Supervisor: {pasantia.supervisorNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {new Date(pasantia.fechaInicio).toLocaleDateString('es-ES')} - 
                    {' '}{new Date(pasantia.fechaFin).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>

              {/* Progreso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Progreso</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {pasantia.horasCompletadas} / {pasantia.horasRequeridas} hrs
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-green-600 rounded-full transition-all"
                    style={{
                      width: `${Math.min((pasantia.horasCompletadas / pasantia.horasRequeridas) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-right">
                  {Math.round((pasantia.horasCompletadas / pasantia.horasRequeridas) * 100)}% completado
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
