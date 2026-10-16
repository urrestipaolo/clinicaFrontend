import { useMemo, useState, ChangeEvent } from 'react'; 
import { listaPacientes } from '../contenido-informacion/lista-pacientes';
import { BuscadorPacientes } from '../componentes/Buscador';
import { PacienteCard } from '../componentes/PacienteCard';
import { PacienteRow } from '../componentes/PacienteRow';
import { EstadoPaciente, FiltroEstado, Paciente } from '../types/paciente';
import { estadoPacientex, filtroEstadox, estadoPaciente, etiquetaPacientex } from '../contenido-informacion/estadoPaciente';
import { FormularioPaciente } from '../componentes/FormularioPacientes';

const tablaColumnas: string[] = [
  'Paciente',
  'Email',
  'Teléfono',
  'Especialidad',
  'Última cita',
  'Estado',
];

const normalizar = (texto: string): string =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const opcionesFiltro: { valor: FiltroEstado; etiqueta: string }[] = [
  { valor: 'Todos', etiqueta: 'Todos los estados' },
  ...estadoPacientex.map((estado) => ({
    valor: estado,
    etiqueta: etiquetaPacientex[estado],
  })),
];

export function PaginaPacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(listaPacientes);
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState<FiltroEstado>('Todos');


  const termino = normalizar(busqueda.trim());
  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      normalizar(`${paciente.nombre} ${paciente.apellido}`).includes(termino) &&
      (estadoFiltro === 'Todos' || paciente.estado === estadoFiltro),
  );

  const hayFiltros = busqueda !== '' || estadoFiltro !== 'Todos';

  const manejarFiltroEstado = (evento: ChangeEvent<HTMLSelectElement>) => {
    const valor = evento.target.value;
    if (filtroEstadox(valor)) setEstadoFiltro(valor);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setEstadoFiltro('Todos');
  };

  const agregarPaciente = (nuevo: Paciente) =>
    setPacientes((prev) => [...prev, nuevo]);

  const cambiarEstado = (id: string, estado: EstadoPaciente) =>
    setPacientes((prev) =>
      prev.map((paciente) =>
        paciente.id === id ? { ...paciente, estado } : paciente,
      ),
    );

  const eliminarPaciente = (id: string) => {
    if (!window.confirm('¿Seguro que quieres eliminar este paciente?')) return;
    setPacientes((prev) => prev.filter((paciente) => paciente.id !== id));
  };

  const hayResultados = pacientesFiltrados.length > 0;

  return (
    <div className="flex flex-col gap-6 text-left">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Pacientes
        </h1>
        <p className="text-sm text-slate-500">
          Gestión y seguimiento de pacientes registrados
        </p>
      </header>

      <FormularioPaciente onAgregar={agregarPaciente} />

      <section className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <BuscadorPacientes value={busqueda} onChange={setBusqueda} />

          <label htmlFor="filtro-estado" className="sr-only">
            Filtrar pacientes por estado
          </label>
          <select
            id="filtro-estado"
            value={estadoFiltro}
            onChange={manejarFiltroEstado}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
          >
            {opcionesFiltro.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={limpiarFiltros}
            disabled={!hayFiltros}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Limpiar filtros
          </button>
        </div>

        <p className="text-xs font-semibold text-slate-600" aria-live="polite">
          {pacientesFiltrados.length} paciente(s) encontrado(s)
        </p>
      </section>

      {hayResultados ? (
        <>
          {/* Móvil: tarjetas verticales */}
          <div className="flex flex-col gap-3 md:hidden">
            {pacientesFiltrados.map((paciente) => (
              <PacienteCard
                key={paciente.id}
                paciente={paciente}
                onCambiarEstado={cambiarEstado}
                onEliminar={eliminarPaciente}
              />
            ))}
          </div>

          {/* Desktop: tabla */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    {tablaColumnas.map((columna) => (
                      <th
                        key={columna}
                        scope="col"
                        className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {columna}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pacientesFiltrados.map((paciente) => (
                    <PacienteRow
                      key={paciente.id}
                      paciente={paciente}
                      onCambiarEstado={cambiarEstado}
                      onEliminar={eliminarPaciente}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h3 className="text-base font-semibold text-slate-800">
            No se encontraron pacientes
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {pacientes.length === 0
              ? 'Aún no hay pacientes registrados. Agrega el primero con el formulario.'
              : 'Prueba con otro nombre o limpia los filtros.'}
          </p>
        </div>
      )}
    </div>
  );
}