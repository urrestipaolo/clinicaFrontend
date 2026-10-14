import type { ChangeEvent } from 'react';
import { estadoPacientex, etiquetaPacientex, estadoPaciente } from '../contenido-informacion/estadoPaciente';
import type { EstadoPaciente } from '../types/paciente';

interface SelectEstadoInterface {
  estado: EstadoPaciente;
  etiqueta: string;
  onChange: (estado: EstadoPaciente) => void;
}

export function SelectEstadoPaciente({
  estado,
  etiqueta,
  onChange,
}: SelectEstadoInterface) {
  const manejarCambio = (evento: ChangeEvent<HTMLSelectElement>) => {
    const valor = evento.target.value;
    if (estadoPaciente(valor)) onChange(valor);
  };

  return (
    <select
      aria-label={etiqueta}
      value={estado}
      onChange={manejarCambio}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
    >
      {estadoPacientex.map((opcion) => (
        <option key={opcion} value={opcion}>
          {etiquetaPacientex[opcion]}
        </option>
      ))}
    </select>
  );
}