import { z } from 'zod';

// Solo los campos que el modelo `citas` guarda: paciente, médico y fecha.
// `estado` lo asigna el backend ("pendiente" por defecto).
// Los ids vienen como string porque un <select> siempre entrega texto;
// se convierten con Number() al enviarlos al backend.
export const citaSchema = z.object({
  pacienteId: z.string().min(1, 'Selecciona un paciente'),
  medicoId: z.string().min(1, 'Selecciona un médico'),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD')
    // La fecha de hoy se calcula al validar, no al cargar el módulo.
    .refine(
      (fecha) => fecha >= new Date().toISOString().split('T')[0],
      'La fecha no puede ser pasada',
    ),
});

export type CitaFormData = z.infer<typeof citaSchema>;