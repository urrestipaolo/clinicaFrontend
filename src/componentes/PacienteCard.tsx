import { Link } from 'react-router-dom';
import type { Paciente } from '../types/clinica';
import {
  calcularEdad,
  formatearFecha,
  nombreCompleto,
} from '../hooks/formato.ts';

interface PacienteCardProps {
  paciente: Paciente;
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold leading-tight text-slate-800">
        {nombreCompleto(paciente)}
      </h2>

      <dl className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Email</dt>
          <dd className="truncate font-medium text-slate-700">
            {paciente.email ?? '-'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Teléfono</dt>
          <dd className="text-slate-700">{paciente.telefono}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Nacimiento</dt>
          <dd className="text-slate-700">
            {formatearFecha(paciente.fechaNacimiento)} (
            {calcularEdad(paciente.fechaNacimiento)} años)
          </dd>
        </div>
      </dl>

      <Link
        to={`/pacientes/${paciente.id}`}
        className="self-start text-xs font-semibold text-emerald-700 hover:underline"
      >
        Ver detalle →
      </Link>
    </article>
  );
}