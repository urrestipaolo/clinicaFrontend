import type { EstadoPaciente } from '../types/paciente';

interface BadgeEstadoProps {
  estado: EstadoPaciente;
}

const estilosPorEstado: Record<EstadoPaciente, string> = {
  activo: 'bg-emerald-100 text-emerald-800',
  inactivo: 'bg-rose-100 text-rose-800',
  en_espera: 'bg-amber-100 text-amber-800',
};

const etiquetaPorEstado: Record<EstadoPaciente, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  en_espera: 'En espera',
};

export function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${estilosPorEstado[estado]}`}
    >
      {etiquetaPorEstado[estado]}
    </span>
  );
}