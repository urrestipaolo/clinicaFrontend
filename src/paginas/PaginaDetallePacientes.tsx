import { useNavigate, useParams } from 'react-router-dom';
import { usePacientes } from '../hooks/usePacientes';
import { calcularEdad, formatearFecha, nombreCompleto} from '../hooks/formato';
import { Pagina404 } from './Pagina404';
import { Spinner } from '../componentes/Spinner';

export function PaginaDetallePaciente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pacientes, cargando, error, recargar } = usePacientes();

  if (cargando) return <Spinner etiqueta="Cargando paciente..." />;

  if (error) {
    return (
      <div
        role="alert"
        className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-8 text-center"
      >
        <p className="text-sm font-semibold text-red-700">
          No se pudo cargar el paciente.
        </p>
        <button
          type="button"
          onClick={recargar}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // useParams entrega el id como string; el id de la base de datos es number.
  const paciente = pacientes.find((p) => String(p.id) === id);

  if (!paciente) return <Pagina404 />;

  const expediente = paciente.expediente?.[0];

  const datos = [
    { etiqueta: 'ID', valor: String(paciente.id) },
    { etiqueta: 'Email', valor: paciente.email ?? '-' },
    { etiqueta: 'Teléfono', valor: paciente.telefono },
    {
      etiqueta: 'Fecha de nacimiento',
      valor: `${formatearFecha(paciente.fechaNacimiento)} (${calcularEdad(
        paciente.fechaNacimiento,
      )} años)`,
    },
    ...(expediente
      ? [{ etiqueta: 'Expediente', valor: `N.º ${expediente.id}` }]
      : []),
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
        <header className="mb-4 border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            {nombreCompleto(paciente)}
          </h1>
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

      {paciente.cita && paciente.cita.length > 0 && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">Citas</h2>
          <ul className="flex flex-col divide-y divide-slate-100 text-sm">
            {paciente.cita.map((cita) => (
              <li
                key={cita.id}
                className="flex items-center justify-between py-2"
              >
                <span className="text-slate-700">
                  {formatearFecha(cita.fecha)}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                  {cita.estado}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}