import type { ChangeEvent } from "react";

interface BuscadorPacientesProps {
  value: string;
  onChange: (value: string) => void;
}

export function BuscadorPacientes({ value, onChange }: BuscadorPacientesProps) {

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement>) =>
    onChange(evento.target.value);

  return (
    <div className="flex-1">
      <label htmlFor="buscador-pacientes" className="sr-only">
        Buscar pacientes por nombre o apellido
      </label>
      <input
        id="buscador-pacientes"
        type="search"
        value={value}
        onChange={manejarCambio}
        placeholder="Buscar pacientes por nombre o apellido..."
        className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
      />
    </div>
  );
}