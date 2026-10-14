import type { Paciente } from '../types/paciente';
import { BadgeEstado } from './BadgeEstado';

interface PacienteCardProps {
  paciente: Paciente;
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-semibold leading-tight text-slate-800">
          {paciente.nombre} {paciente.apellido}
        </h2>
        <BadgeEstado estado={paciente.estado} />
      </div>

      <dl className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Email</dt>
          <dd className="truncate font-medium text-slate-700">{paciente.email}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Teléfono</dt>
          <dd className="text-slate-700">{paciente.telefono}</dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Especialidad</dt>
          <dd className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-800">
            {paciente.especialidadAsignada}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-slate-400">Última cita</dt>
          <dd className="text-slate-700">{paciente.ultimaCita}</dd>
        </div>
      </dl>
    </article>
  );
}