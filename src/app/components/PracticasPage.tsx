import React, { useState } from 'react';
import { Link } from 'react-router';
import { getCurrentUser } from '../utils/auth';
import { mockPracticas } from '../utils/mockData';
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  Building2,
  Calendar,
  User,
} from 'lucide-react';

export function PracticasPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');

  if (!user) return null;

  // Filtrar prácticas según el rol
  const getPracticas = () => {
    if (user.rol === 'alumno') {
      return mockPracticas.filter(p => p.estudianteId === user.id);
    }
    if (user.rol === 'profesor') {
      return mockPracticas.filter(p => p.supervisorId === user.id);
    }
    return mockPracticas;
  };

  let practicas = getPracticas();

  // Aplicar filtros
  if (searchTerm) {
    practicas = practicas.filter(p =>
      p.estudianteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.empresaNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterEstado !== 'todos') {
    practicas = practicas.filter(p => p.estado === filterEstado);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Prácticas Profesionales</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user.rol === 'alumno' ? 'Gestiona tus prácticas' : 'Administra las prácticas profesionales'}
          </p>
        </div>
        {user.rol === 'coordinador' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Nueva Práctica</span>
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por estudiante, empresa o área..."
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

      {/* Lista de Prácticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {practicas.length === 0 ? (
          <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">No se encontraron prácticas</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterEstado !== 'todos'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no hay prácticas registradas'}
            </p>
          </div>
        ) : (
          practicas.map((practica) => (
            <Link
              key={practica.id}
              to={`/practicas/${practica.id}`}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg hover:border-indigo-200 dark:hover:border-green-500 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{practica.estudianteNombre}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{practica.area}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getEstadoBadge(practica.estado)} dark:${getEstadoBadgeDark(practica.estado)}`}>
                  {getEstadoLabel(practica.estado)}
                </span>
              </div>

              {/* Detalles */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{practica.empresaNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Supervisor: {practica.supervisorNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {new Date(practica.fechaInicio).toLocaleDateString('es-ES')} - 
                    {' '}{new Date(practica.fechaFin).toLocaleDateString('es-ES')}
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
