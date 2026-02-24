import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../utils/auth';
import { mockEmpresas, mockPeriodos } from '../utils/mockData';
import {
  ArrowLeft,
  Building2,
  Calendar,
  FileText,
  User,
  Save,
} from 'lucide-react';

export function NuevaPasantiaPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    empresaId: '',
    periodoId: '',
    fechaInicio: '',
    fechaFin: '',
    area: '',
    descripcion: '',
  });

  if (!user) return null;

  const periodoActivo = mockPeriodos.find(p => p.activo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear la nueva pasantía
    // Por ahora, solo redirigimos a la lista de pasantías
    console.log('Datos del formulario:', formData);
    navigate('/pasantias');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/pasantias')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="font-bold text-gray-900 dark:text-gray-100">Nueva Pasantía</h1>
          <p className="text-gray-600 dark:text-gray-400">Registra una nueva pasantía profesional</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="space-y-6">
          {/* Empresa */}
          <div>
            <label htmlFor="empresaId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Empresa
            </label>
            <select
              id="empresaId"
              name="empresaId"
              value={formData.empresaId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Selecciona una empresa</option>
              {mockEmpresas.map(empresa => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Período Académico */}
          <div>
            <label htmlFor="periodoId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Período Académico
            </label>
            <select
              id="periodoId"
              name="periodoId"
              value={formData.periodoId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Selecciona un período</option>
              {mockPeriodos.map(periodo => (
                <option key={periodo.id} value={periodo.id}>
                  {periodo.nombre} {periodo.activo && '(Activo)'}
                </option>
              ))}
            </select>
            {periodoActivo && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Período activo: {periodoActivo.nombre}
              </p>
            )}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha de Inicio
              </label>
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={formData.fechaInicio}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Fecha de Fin
              </label>
              <input
                type="date"
                id="fechaFin"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Área */}
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Área de la Pasantía
            </label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              placeholder="Ej: Desarrollo Web, Marketing Digital, etc."
              className="w-full px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe las actividades y responsabilidades de la pasantía..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-green-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/pasantias')}
              className="w-full sm:w-auto px-4 py-2.5 sm:py-2 text-base sm:text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-base sm:text-sm bg-indigo-600 dark:bg-green-600 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Pasantía</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
