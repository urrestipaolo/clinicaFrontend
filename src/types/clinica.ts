// Espejo de los modelos de schema.prisma.
//
// - Los campos DateTime @db.Date llegan en el JSON como texto ISO
//   ("2000-05-17T00:00:00.000Z"), por eso son `string`.
// - Los campos de relación (cita, expediente, especialidad, etc.) solo vienen
//   en el JSON si el backend usa `include` en Prisma; por eso son opcionales.

export interface Especialidad {
  id: number;
  especialidad: string;
  medico?: Medico[];
}

export interface Medico {
  id: number;
  medico: string;
  especialidadId: number;
  especialidad?: Especialidad;
  citaMedica?: Cita[];
}

export interface Expediente {
  id: number;
  pacienteId: number;
  pacienteExpediente?: Paciente;
}

export interface Paciente {
  id: number;
  nombre: string;
  apPaterno: string;
  apMaterno: string;
  telefono: string;
  email: string | null;
  fechaNacimiento: string;
  cita?: Cita[];
  expediente?: Expediente[];
}

// `estado` es un String libre en la base de datos; su valor por defecto es
// "pendiente". Confirma que el valor para las citas completadas coincida con
// el que usa tu backend.
export const ESTADO_CITA_PENDIENTE = 'pendiente';
export const ESTADO_CITA_COMPLETADA = 'completada';

export interface Cita {
  id: number;
  pacienteId: number;
  fecha: string;
  estado: string;
  medicoId: number;
  pacienteCita?: Paciente;
  medicoCita?: Medico;
}