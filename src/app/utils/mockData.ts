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
  estado: 'pendiente' | 'actualizar' | 'aprobado' | 'rechazado';
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

export interface Voto {
  id: string;
  practicaId: string;
  usuarioId: string;
  usuarioNombre: string;
  usuarioRol: UserRole;
  tipo: 'aprobado' | 'rechazado' | 'actualizar';
  fecha: string;
}

export interface Comentario {
  id: string;
  practicaId: string;
  usuarioId: string;
  usuarioNombre: string;
  usuarioRol: UserRole;
  contenido: string;
  fecha: string;
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
    estado: 'pendiente',
    area: 'Ingeniería de Sistemas',
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
    estado: 'aprobado',
    area: 'Diseño Gráfico',
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
    estado: 'pendiente',
    area: 'Ciencia de Datos',
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
    area: 'Ingeniería Informática',
    descripcion: 'Soporte técnico y mantenimiento de sistemas',
  },
  {
    id: '5',
    estudianteId: '1',
    estudianteNombre: 'Juan Pérez',
    empresaId: '2',
    empresaNombre: 'Innovación Digital EIRL',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-09-01',
    fechaFin: '2026-01-15',
    horasRequeridas: 450,
    horasCompletadas: 0,
    estado: 'aprobado',
    area: 'Ingeniería de Sistemas',
    descripcion: 'Desarrollo de aplicaciones móviles nativas e híbridas con React Native y Flutter',
  },
  {
    id: '6',
    estudianteId: '1',
    estudianteNombre: 'Juan Pérez',
    empresaId: '3',
    empresaNombre: 'Consultores Unidos SA',
    supervisorId: '2',
    supervisorNombre: 'María García',
    periodoId: '2',
    fechaInicio: '2025-10-01',
    fechaFin: '2026-02-28',
    horasRequeridas: 500,
    horasCompletadas: 0,
    estado: 'rechazado',
    area: 'Ingeniería de Sistemas',
    descripcion: 'Desarrollo de modelos de machine learning y procesamiento de datos con Python y TensorFlow',
  },
];

export const mockVotos: Voto[] = [
  {
    id: '1',
    practicaId: '1',
    usuarioId: '2',
    usuarioNombre: 'María García',
    usuarioRol: 'profesor',
    tipo: 'aprobado',
    fecha: '2025-08-20',
  },
  {
    id: '2',
    practicaId: '1',
    usuarioId: '3',
    usuarioNombre: 'Carlos López',
    usuarioRol: 'coordinador',
    tipo: 'actualizar',
    fecha: '2025-08-18',
  },
];

export const mockComentarios: Comentario[] = [
  {
    id: '1',
    practicaId: '1',
    usuarioId: '2',
    usuarioNombre: 'María García',
    usuarioRol: 'profesor',
    contenido: 'La propuesta de pasantía es muy interesante y se alinea con los objetivos académicos del estudiante. Recomiendo su aprobación.',
    fecha: '2025-08-20T10:30:00',
  },
  {
    id: '2',
    practicaId: '1',
    usuarioId: '3',
    usuarioNombre: 'Carlos López',
    usuarioRol: 'coordinador',
    contenido: 'Solicito que se actualice la descripción de la pasantía para incluir más detalles sobre las responsabilidades específicas del estudiante.',
    fecha: '2025-08-18T14:15:00',
  },
  {
    id: '3',
    practicaId: '1',
    usuarioId: '2',
    usuarioNombre: 'María García',
    usuarioRol: 'profesor',
    contenido: 'El estudiante ha demostrado un buen desempeño en las materias relacionadas. La empresa propuesta tiene una excelente reputación en el sector.',
    fecha: '2025-08-19T09:45:00',
  },
];
