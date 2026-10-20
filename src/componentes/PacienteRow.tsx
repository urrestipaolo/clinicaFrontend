import { Link } from 'react-router-dom';
import type { Paciente } from '../types/clinica';
import {
  calcularEdad,
  formatearFecha,
  nombreCompleto,
} from '../hooks/formato';

interface PacienteRowProps {
  paciente: Paciente;
}

export function PacienteRow({ paciente }: PacienteRowProps) {
  return (
    <tr className="transition-colors hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-slate-800">
        {nombreCompleto(paciente)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {paciente.email ?? '-'}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {paciente.telefono}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-slate-600">
        {formatearFecha(paciente.fechaNacimiento)} (
        {calcularEdad(paciente.fechaNacimiento)} años)
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        <Link
          to={`/pacientes/${paciente.id}`}
          className="text-xs font-semibold text-emerald-700 hover:underline"
        >
          Ver detalle →
        </Link>
      </td>
    </tr>
  );
}