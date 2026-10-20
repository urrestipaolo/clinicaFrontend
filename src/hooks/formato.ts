import type { Paciente } from '../types/clinica';

export const nombreCompleto = (
  paciente: Pick<Paciente, 'nombre' | 'apPaterno' | 'apMaterno'>,
): string =>
  `${paciente.nombre} ${paciente.apPaterno} ${paciente.apMaterno}`.trim();

// "2000-05-17T00:00:00.000Z" -> "17/05/2000".
// Usa solo la parte de la fecha (sin crear un Date) para evitar que la zona
// horaria corra el día.
export function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}/${anio}`;
}

export function calcularEdad(fechaNacimiento: string): number {
  const [anio, mes, dia] = fechaNacimiento.slice(0, 10).split('-').map(Number);
  const hoy = new Date();
  const mesActual = hoy.getMonth() + 1;
  const yaCumplio =
    mesActual > mes || (mesActual === mes && hoy.getDate() >= dia);
  return hoy.getFullYear() - anio - (yaCumplio ? 0 : 1);
}

export const normalizar = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();