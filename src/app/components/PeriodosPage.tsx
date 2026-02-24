import React, { useState } from 'react';
import { mockPeriodos } from '../utils/mockData';
import { Calendar, Plus, CheckCircle2, Clock, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export function PeriodosPage() {
  const [periodos] = useState(mockPeriodos);
  const [nuevoPeriodoOpen, setNuevoPeriodoOpen] = useState(false);
  const [editarPeriodoOpen, setEditarPeriodoOpen] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Períodos Académicos</h1>
          <p className="text-gray-600 dark:text-gray-400">Administra los períodos para prácticas profesionales</p>
        </div>
        <Dialog open={nuevoPeriodoOpen} onOpenChange={setNuevoPeriodoOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Nuevo Período</span>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-800 max-w-[95vw] sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Nuevo Período Académico</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Crea un nuevo período académico para las prácticas profesionales
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Período
                </label>
                <input
                  type="text"
                  placeholder="Ej: 2025-1"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Inicio
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha de Fin
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <button
                type="button"
                onClick={() => setNuevoPeriodoOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setNuevoPeriodoOpen(false)}
                className="px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors"
              >
                Crear Período
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Períodos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {periodos.map((periodo) => (
          <div
            key={periodo.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-4 sm:p-6 transition-all ${
              periodo.activo
                ? 'border-indigo-500 dark:border-green-500 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">{periodo.nombre}</h3>
                  {periodo.activo && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Activo
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-2 rounded-lg ${
                periodo.activo ? 'bg-indigo-50 dark:bg-green-900/30' : 'bg-gray-50 dark:bg-gray-700'
              }`}>
                <Calendar className={`w-5 h-5 ${
                  periodo.activo ? 'text-indigo-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
                }`} />
              </div>
            </div>

            {/* Fechas */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(periodo.fechaInicio).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {new Date(periodo.fechaFin).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Prácticas</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{periodo.totalPracticas}</span>
              </div>
              {periodo.totalPracticas > 0 && (
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-green-600 rounded-full"
                    style={{ width: '100%' }}
                  />
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Dialog open={editarPeriodoOpen === periodo.id} onOpenChange={(open) => setEditarPeriodoOpen(open ? periodo.id : null)}>
                <DialogTrigger asChild>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Editar</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800 max-w-[95vw] sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">Editar Período Académico</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                      Modifica la información del período académico
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nombre del Período
                      </label>
                      <input
                        type="text"
                        defaultValue={periodo.nombre}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fecha de Inicio
                        </label>
                        <input
                          type="date"
                          defaultValue={periodo.fechaInicio}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fecha de Fin
                        </label>
                        <input
                          type="date"
                          defaultValue={periodo.fechaFin}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <input
                          type="checkbox"
                          defaultChecked={periodo.activo}
                          className="w-4 h-4 text-indigo-600 dark:text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-green-500"
                        />
                        <span>Período Activo</span>
                      </label>
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      type="button"
                      onClick={() => setEditarPeriodoOpen(null)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditarPeriodoOpen(null)}
                      className="px-4 py-2 bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors"
                    >
                      Guardar Cambios
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {!periodo.activo && periodo.totalPracticas === 0 && (
                <button className="w-full sm:w-auto flex items-center justify-center p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info adicional */}
      <div className="bg-indigo-50 dark:bg-green-900/20 border border-indigo-200 dark:border-green-800 rounded-xl p-4">
        <div className="flex gap-3">
          <Calendar className="w-5 h-5 text-indigo-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-indigo-900 dark:text-green-200 mb-1">Control Automático de Períodos</p>
            <p className="text-sm text-indigo-700 dark:text-green-300">
              Los períodos académicos se actualizan automáticamente según las fechas configuradas.
              Solo puede haber un período activo a la vez.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
