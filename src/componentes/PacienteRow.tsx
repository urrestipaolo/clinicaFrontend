import type { Paciente } from '../types/paciente';
import { BadgeEstado } from './BadgeEstado';

interface PacienteRowProps {
  paciente: Paciente;
}

export function PacienteRow({ paciente }: PacienteRowProps) {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-800">
        {paciente.nombre} {paciente.apellido}
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
    </tr>
  );
}
