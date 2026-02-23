import React from "react";
import { useParams, useNavigate } from 'react-router';
import { mockPracticas, mockDocumentos } from '../utils/mockData';
import { getCurrentUser } from '../utils/auth';
import {
  ArrowLeft,
  Building2,
  User,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Download,
  Edit,
  TrendingUp,
} from 'lucide-react';

export function PracticaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const practica = mockPracticas.find(p => p.id === id);
  const documentos = mockDocumentos.filter(d => d.practicaId === id);

  if (!practica || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Práctica no encontrada</p>
        <button
          onClick={() => navigate('/practicas')}
          className="mt-4 text-indigo-600 hover:text-indigo-700"
        >
          Volver a Prácticas
        </button>
      </div>
    );
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

  const getTipoDocumento = (tipo: string) => {
    switch (tipo) {
      case 'carta_presentacion':
        return 'Carta de Presentación';
      case 'informe_final':
        return 'Informe Final';
      case 'evaluacion':
        return 'Evaluación';
      case 'convenio':
        return 'Convenio';
      default:
        return tipo;
    }
  };

  const progreso = Math.round((practica.horasCompletadas / practica.horasRequeridas) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/practicas')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-bold text-gray-900">Detalle de Práctica</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(practica.estado)}`}>
              {getEstadoLabel(practica.estado)}
            </span>
          </div>
          <p className="text-gray-600">{practica.estudianteNombre}</p>
        </div>
        {(user.rol === 'coordinador' || user.rol === 'supervisor') && (
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detalles Generales */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Información General</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Estudiante</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{practica.estudianteNombre}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Empresa</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{practica.empresaNombre}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Supervisor Académico</p>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{practica.supervisorNombre}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Área</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">{practica.area}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fecha de Inicio</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">
                      {new Date(practica.fechaInicio).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fecha de Finalización</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="font-medium text-gray-900">
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Descripción</p>
              <p className="text-gray-900">{practica.descripcion}</p>
            </div>
          </div>

          {/* Progreso de Horas */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Progreso de Horas</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-900">Avance General</span>
                </div>
                <span className="text-2xl font-bold text-indigo-600">{progreso}%</span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Requeridas</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <p className="font-bold text-gray-900">{practica.horasRequeridas}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Completadas</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-green-600" />
                    <p className="font-bold text-green-600">{practica.horasCompletadas}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Restantes</p>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <p className="font-bold text-orange-600">
                      {practica.horasRequeridas - practica.horasCompletadas}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Documentos */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Documentos</h2>
            {documentos.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500">No hay documentos generados</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documentos.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <FileText className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm mb-1 truncate">
                          {getTipoDocumento(doc.tipo)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(doc.fechaGeneracion).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              Generar Documento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
