import type { Paciente } from '../types/paciente';
import { EstadoPaciente } from '../types/paciente';
import { BadgeEstado } from './BadgeEstado';
import { SelectEstadoPaciente } from './EstadoSelect';

interface PacienteCardProps {
  paciente: Paciente;
  onCambiarEstado: (id: string, estado: EstadoPaciente) => void;
  onEliminar: (id: string) => void;
}

export function PacienteCard({paciente, onCambiarEstado, onEliminar }: PacienteCardProps) {
  
  const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`.trim();

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-sm font-semibold leading-tight text-slate-800">
          {nombreCompleto}
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

      <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <SelectEstadoPaciente
          estado={paciente.estado}
          etiqueta={`Cambiar estado de ${nombreCompleto}`}
          onChange={(estado) => onCambiarEstado(paciente.id, estado)}
        />
        <button
          type="button"
          aria-label={`Eliminar a ${nombreCompleto}`}
          onClick={() => onEliminar(paciente.id)}
          className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}