import type { Paciente } from '../types/paciente';
import { EstadoPaciente } from '../types/paciente';
import { BadgeEstado } from './BadgeEstado';
import { SelectEstadoPaciente } from './EstadoSelect';

interface PacienteRowProps {
  paciente: Paciente;
  onCambiarEstado: (id: string, estado: EstadoPaciente) => void;
  onEliminar: (id: string) => void;
}

export function PacienteRow({ paciente, onCambiarEstado, onEliminar }: PacienteRowProps) {
  
  const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`.trim();

  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-800">
        {nombreCompleto}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {paciente.email}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {paciente.telefono}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {paciente.especialidadAsignada}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {paciente.ultimaCita}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <BadgeEstado estado={paciente.estado} />
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <div className="flex items-center gap-2">
          <SelectEstadoPaciente
            estado={paciente.estado}
            etiqueta={`Cambiar estado de ${nombreCompleto}`}
            onChange={(estado) => onCambiarEstado(paciente.id, estado)}
          />
          <button
            type="button"
            aria-label={`Eliminar a ${nombreCompleto}`}
            onClick={() => onEliminar(paciente.id)}
            className="rounded-lg border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-50"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}