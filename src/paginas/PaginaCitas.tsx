import { FormularioCita } from '../componentes/FormularioCitas';

export function PaginaNuevaCita() {
  return (
    <div className="flex flex-col gap-6 text-left">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold bg-cyan-950 tracking-tight text-slate-800">
          AGENDAR UNA NUEVA CITA
        </h1>
        <p className="text-sm text-slate-500">
          INGRESE LOS DATOS CORRESPONDIENTES PARA AGENDAR UNA CITA
        </p>
      </header>

      <FormularioCita />
    </div>
  );
}