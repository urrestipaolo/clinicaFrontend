import { useNavigate, useParams } from 'react-router-dom';
import { listaPacientes } from '../contenido-informacion/lista-pacientes';
import { BadgeEstado } from '../componentes/BadgeEstado';
import { Pagina404 } from './Pagina404';

export function PaginaDetallePaciente() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const paciente = listaPacientes.find((p) => p.id === id);

  if (!paciente) return <Pagina404 />;

  const datos = [
    { etiqueta: 'ID', valor: paciente.id },
    { etiqueta: 'Email', valor: paciente.email },
    { etiqueta: 'Teléfono', valor: paciente.telefono },
    { etiqueta: 'Especialidad asignada', valor: paciente.especialidadAsignada },
    { etiqueta: 'Última cita', valor: paciente.ultimaCita },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          ← Volver
        </button>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            {paciente.nombre} {paciente.apellido}
          </h1>
          <BadgeEstado estado={paciente.estado} />
        </header>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {datos.map((dato) => (
            <div key={dato.etiqueta} className="flex flex-col gap-0.5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {dato.etiqueta}
              </dt>
              <dd className="text-sm text-slate-800">{dato.valor}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}