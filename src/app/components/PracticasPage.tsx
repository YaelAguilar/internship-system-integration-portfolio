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
  TrendingUp,
} from 'lucide-react';

export function PracticasPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');

  if (!user) return null;

  // Filtrar prácticas según el rol
  const getPracticas = () => {
    if (user.rol === 'estudiante') {
      return mockPracticas.filter(p => p.estudianteId === user.id);
    }
    if (user.rol === 'supervisor') {
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
      case 'en_progreso':
        return 'bg-blue-100 text-blue-700';
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-bold text-gray-900 mb-1">Prácticas Profesionales</h1>
          <p className="text-gray-600">
            {user.rol === 'estudiante' ? 'Gestiona tus prácticas' : 'Administra las prácticas profesionales'}
          </p>
        </div>
        {(user.rol === 'coordinador' || user.rol === 'supervisor') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Nueva Práctica</span>
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por estudiante, empresa o área..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
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
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium text-gray-900 mb-2">No se encontraron prácticas</h3>
            <p className="text-gray-500">
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
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 mb-1">{practica.estudianteNombre}</h3>
                  <p className="text-sm text-gray-600">{practica.area}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getEstadoBadge(practica.estado)}`}>
                  {getEstadoLabel(practica.estado)}
                </span>
              </div>

              {/* Detalles */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{practica.empresaNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Supervisor: {practica.supervisorNombre}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {new Date(practica.fechaInicio).toLocaleDateString('es-ES')} - 
                    {' '}{new Date(practica.fechaFin).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>

              {/* Progreso */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Progreso</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {practica.horasCompletadas} / {practica.horasRequeridas} hrs
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{
                      width: `${Math.min((practica.horasCompletadas / practica.horasRequeridas) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-right">
                  {Math.round((practica.horasCompletadas / practica.horasRequeridas) * 100)}% completado
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
