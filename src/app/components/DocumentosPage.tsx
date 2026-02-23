import React, { useState } from 'react';
import { getCurrentUser } from '../utils/auth';
import { mockDocumentos, mockPracticas } from '../utils/mockData';
import { FileText, Download, Search, Filter, Calendar, User } from 'lucide-react';

export function DocumentosPage() {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');

  if (!user) return null;

  // Filtrar documentos según el rol
  const getDocumentos = () => {
    if (user.rol === 'estudiante') {
      const misPracticas = mockPracticas.filter(p => p.estudianteId === user.id);
      const misPracticasIds = misPracticas.map(p => p.id);
      return mockDocumentos.filter(d => misPracticasIds.includes(d.practicaId));
    }
    if (user.rol === 'supervisor') {
      const practicasSupervisadas = mockPracticas.filter(p => p.supervisorId === user.id);
      const practicasIds = practicasSupervisadas.map(p => p.id);
      return mockDocumentos.filter(d => practicasIds.includes(d.practicaId));
    }
    return mockDocumentos;
  };

  let documentos = getDocumentos();

  // Aplicar filtros
  if (searchTerm) {
    documentos = documentos.filter(d =>
      d.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (filterTipo !== 'todos') {
    documentos = documentos.filter(d => d.tipo === filterTipo);
  }

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

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'carta_presentacion':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'informe_final':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'evaluacion':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'convenio':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const tipoOptions = [
    { value: 'todos', label: 'Todos los documentos' },
    { value: 'carta_presentacion', label: 'Cartas de Presentación' },
    { value: 'informe_final', label: 'Informes Finales' },
    { value: 'evaluacion', label: 'Evaluaciones' },
    { value: 'convenio', label: 'Convenios' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-bold text-gray-900 mb-1">Documentos</h1>
          <p className="text-gray-600">Gestión de documentos generados automáticamente</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <FileText className="w-5 h-5" />
          <span>Generar Documento</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative min-w-[250px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              {tipoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Documentos */}
      <div className="bg-white rounded-xl border border-gray-200">
        {documentos.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium text-gray-900 mb-2">No se encontraron documentos</h3>
            <p className="text-gray-500">
              {searchTerm || filterTipo !== 'todos'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no hay documentos generados'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {documentos.map((doc) => {
              const practica = mockPracticas.find(p => p.id === doc.practicaId);
              return (
                <div
                  key={doc.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <FileText className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{doc.nombre}</h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getTipoColor(doc.tipo)}`}>
                              {getTipoDocumento(doc.tipo)}
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          <span>Descargar</span>
                        </button>
                      </div>
                      {practica && (
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span>{practica.estudianteNombre}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Generado: {new Date(doc.fechaGeneracion).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info sobre generación automática */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-purple-900 mb-1">Generación Automática de PDFs</p>
            <p className="text-sm text-purple-700">
              Los documentos se generan automáticamente usando Puppeteer cuando se cumplen las
              condiciones establecidas (inicio de práctica, finalización, evaluaciones, etc.).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
