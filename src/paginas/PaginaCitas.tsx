import { FormularioCita } from '../componentes/FormularioCitas';
import { useNavigate } from 'react-router-dom';

export function PaginaNuevaCita() {
    const navigate = useNavigate();

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

      <FormularioCita onCancelar={() => navigate(-1)}/>
    </div>
  );
}