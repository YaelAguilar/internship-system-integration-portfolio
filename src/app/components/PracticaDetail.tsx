import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router';
import { mockPracticas, mockVotos, mockComentarios } from '../utils/mockData';
import { getCurrentUser } from '../utils/auth';
import {
  ArrowLeft,
  Building2,
  User,
  Calendar,
  MapPin,
  MessageSquare,
  CheckCircle,
  XCircle,
  RefreshCw,
  Send,
} from 'lucide-react';

export function PracticaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [comentarios, setComentarios] = useState(
    mockComentarios.filter(c => c.practicaId === id).sort((a, b) => 
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    )
  );

  const practica = mockPracticas.find(p => p.id === id);
  const votos = mockVotos.filter(v => v.practicaId === id);

  const handleEnviarComentario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoComentario.trim() || !user || !id) return;

    const comentarioNuevo = {
      id: `comentario-${Date.now()}`,
      practicaId: id,
      usuarioId: user.id,
      usuarioNombre: user.nombre,
      usuarioRol: user.rol,
      contenido: nuevoComentario.trim(),
      fecha: new Date().toISOString(),
    };

    setComentarios([comentarioNuevo, ...comentarios]);
    setNuevoComentario('');
  };

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Comentarios y Votos - Visible para alumnos, profesores y coordinadores */}
          {(user.rol === 'alumno' || user.rol === 'profesor' || user.rol === 'coordinador') && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Comentarios y Votos</h2>
                
                {/* Votos */}
                {votos.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Votos de Evaluación</h3>
                    <div className="space-y-2">
                      {votos.map((voto) => (
                        <div
                          key={voto.id}
                          className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          {voto.tipo === 'aprobado' && (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          )}
                          {voto.tipo === 'rechazado' && (
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                          )}
                          {voto.tipo === 'actualizar' && (
                            <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {voto.usuarioNombre}
                              </p>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({voto.usuarioRol === 'profesor' ? 'Profesor' : voto.usuarioRol === 'coordinador' ? 'Coordinador' : voto.usuarioRol})
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {voto.tipo === 'aprobado' && 'Aprobado'}
                              {voto.tipo === 'rechazado' && 'Rechazado'}
                              {voto.tipo === 'actualizar' && 'Solicita Actualización'}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {new Date(voto.fecha).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comentarios */}
                {comentarios.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Comentarios ({comentarios.length})
                    </h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {comentarios.map((comentario) => (
                        <div
                          key={comentario.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-indigo-500 dark:border-green-500"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {comentario.usuarioNombre}
                              </p>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({comentario.usuarioRol === 'profesor' ? 'Profesor' : comentario.usuarioRol === 'coordinador' ? 'Coordinador' : comentario.usuarioRol})
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comentario.fecha).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {comentario.contenido}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {votos.length === 0 && comentarios.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                    <p>No hay votos ni comentarios aún</p>
                  </div>
                )}

                {/* Formulario de comentarios - Solo para profesores */}
                {user.rol === 'profesor' && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Añadir Comentario
                    </h3>
                    <form onSubmit={handleEnviarComentario} className="space-y-3">
                      <textarea
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        placeholder="Escribe tu comentario aquí..."
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
                        required
                      />
                      <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>Enviar Comentario</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detalles Generales */}
          <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 ${(user.rol === 'alumno' || user.rol === 'profesor' || user.rol === 'coordinador') ? 'lg:col-span-2' : ''}`}>
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
