export type UserRole = 'alumno' | 'profesor' | 'coordinador' | 'empresa';

export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  avatar?: string;
}

export interface Empresa {
  id: string;
  nombre: string;
  ruc: string;
  direccion: string;
  contacto: string;
}

export interface PracticaProfesional {
  id: string;
  estudianteId: string;
  estudianteNombre: string;
  empresaId: string;
  empresaNombre: string;
  supervisorId: string;
  supervisorNombre: string;
  periodoId: string;
  fechaInicio: string;
  fechaFin: string;
  horasRequeridas: number;
  horasCompletadas: number;
  estado: 'pendiente' | 'en_progreso' | 'completada' | 'cancelada';
  area: string;
  descripcion: string;
}

export interface PeriodoAcademico {
  id: string;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  totalPracticas: number;
}

export interface Documento {
  id: string;
  nombre: string;
  tipo: 'carta_presentacion' | 'informe_final' | 'evaluacion' | 'convenio';
  practicaId: string;
  fechaGeneracion: string;
  url: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan.perez@estudiante.edu',
    rol: 'alumno',
  },
  {
    id: '2',
    nombre: 'María García',
    email: 'maria.garcia@supervisor.edu',
    rol: 'profesor',
  },
  {
    id: '3',
    nombre: 'Carlos López',
    email: 'carlos.lopez@coordinador.edu',
    rol: 'coordinador',
  },
  {
    id: '4',
    nombre: 'Ana Martínez',
    email: 'ana.martinez@empresa.com',
    rol: 'empresa',
  },
];

export const mockEmpresas: Empresa[] = [
  {
    id: '1',
    nombre: 'Tech Solutions SAC',
    ruc: '20123456789',
    direccion: 'Av. Javier Prado 1234, San Isidro',
    contacto: 'recursos.humanos@techsolutions.com',
  },
  {
    id: '2',
    nombre: 'Innovación Digital EIRL',
    ruc: '20987654321',
    direccion: 'Calle Las Begonias 567, San Isidro',
    contacto: 'practicas@innovaciondigital.com',
  },
  {
    id: '3',
    nombre: 'Consultores Unidos SA',
    ruc: '20456789123',
    direccion: 'Av. República de Panamá 890, Surco',
    contacto: 'talento@consultoresunidos.com',
  },
];

export const mockPeriodos: PeriodoAcademico[] = [
  {
    id: '1',
    nombre: '2025-1',
    fechaInicio: '2025-03-01',
    fechaFin: '2025-07-31',
    activo: false,
    totalPracticas: 45,
  },
  {
    id: '2',
    nombre: '2025-2',
    fechaInicio: '2025-08-01',
    fechaFin: '2025-12-31',
    activo: true,
    totalPracticas: 38,
  },
  {
    id: '3',
    nombre: '2026-1',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-07-31',
    activo: false,
    totalPracticas: 0,
  },
];

export const mockPracticas: PracticaProfesional[] = [
  {
    id: '1',
    estudianteId: '1',
    estudianteNombre: 'Juan Pérez',
    empresaId: '1',
    empresaNombre: 'Tech Solutions SAC',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-08-15',
    fechaFin: '2025-12-15',
    horasRequeridas: 480,
    horasCompletadas: 320,
    estado: 'en_progreso',
    area: 'Desarrollo Web',
    descripcion: 'Desarrollo de aplicaciones web con React y Node.js',
  },
  {
    id: '2',
    estudianteId: '5',
    estudianteNombre: 'Laura Fernández',
    empresaId: '2',
    empresaNombre: 'Innovación Digital EIRL',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-08-01',
    fechaFin: '2025-11-30',
    horasRequeridas: 400,
    horasCompletadas: 400,
    estado: 'completada',
    area: 'Diseño UX/UI',
    descripcion: 'Diseño de interfaces de usuario y experiencia de usuario',
  },
  {
    id: '3',
    estudianteId: '6',
    estudianteNombre: 'Roberto Sánchez',
    empresaId: '3',
    empresaNombre: 'Consultores Unidos SA',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-09-01',
    fechaFin: '2026-01-31',
    horasRequeridas: 500,
    horasCompletadas: 150,
    estado: 'en_progreso',
    area: 'Análisis de Datos',
    descripcion: 'Análisis de datos empresariales con Python y SQL',
  },
  {
    id: '4',
    estudianteId: '7',
    estudianteNombre: 'Sofía Ramírez',
    empresaId: '1',
    empresaNombre: 'Tech Solutions SAC',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-08-20',
    fechaFin: '2025-12-20',
    horasRequeridas: 480,
    horasCompletadas: 50,
    estado: 'pendiente',
    area: 'Soporte Técnico',
    descripcion: 'Soporte técnico y mantenimiento de sistemas',
  },
];

export const mockDocumentos: Documento[] = [
  {
    id: '1',
    nombre: 'Carta de Presentación',
    tipo: 'carta_presentacion',
    practicaId: '1',
    fechaGeneracion: '2025-08-10',
    url: '#',
  },
  {
    id: '2',
    nombre: 'Informe Final - Juan Pérez',
    tipo: 'informe_final',
    practicaId: '1',
    fechaGeneracion: '2025-12-15',
    url: '#',
  },
  {
    id: '3',
    nombre: 'Evaluación de Desempeño',
    tipo: 'evaluacion',
    practicaId: '2',
    fechaGeneracion: '2025-11-25',
    url: '#',
  },
  {
    id: '4',
    nombre: 'Convenio Marco - Tech Solutions',
    tipo: 'convenio',
    practicaId: '1',
    fechaGeneracion: '2025-07-15',
    url: '#',
  },
];
