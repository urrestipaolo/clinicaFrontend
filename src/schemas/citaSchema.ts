import { z } from 'zod';

export const nivelUrgencia = ['baja', 'media', 'alta', 'critica'] as const;
export type Urgencia = (typeof nivelUrgencia)[number];

export const citaSchema = z.object({

  pacienteNombre: z
    .string()
    .min(3, 'El nombre debe tener minimo 3 caracteres'),

  medicoId: z.string().min(1, 'Selecciona un médico'),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ingrese una fecha en este formato DD/MM/YYYY')
    .refine((fecha) => fecha >= new Date().toISOString().split('T')[0], 'Ingrese una fecha valida'),

  hora: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'La hora de la cita debe ser HH:MM'),

  motivo: z
    .string()
    .min(10, 'Ingrese un motivo valido (minimo 10 caracteres)')
    .max(500, 'El motivo debe ser breve (maximo 500 caracteres)'),
  urgencia: z.enum(nivelUrgencia),
});

export type CitaFormData = z.infer<typeof citaSchema>;