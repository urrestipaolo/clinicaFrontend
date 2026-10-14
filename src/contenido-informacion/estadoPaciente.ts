import type { EstadoPaciente, FiltroEstado } from '../types/paciente';

export const estadoPacientex: EstadoPaciente[] = [
  'activo',
  'inactivo',
  'en_espera',
];

export const etiquetaPacientex: Record<EstadoPaciente, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  en_espera: 'En espera',
};


export function estadoPaciente(valor: string): valor is EstadoPaciente {
  return estadoPacientex.some((estado) => estado === valor);
}

export function filtroEstadox(valor: string): valor is FiltroEstado {
  return valor === 'Todos' || estadoPaciente(valor);
}