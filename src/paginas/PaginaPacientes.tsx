import { useState } from 'react';
import { usePacientes } from '../hooks/usePacientes';
import { nombreCompleto, normalizar } from '../hooks/formato';
import { BuscadorPacientes } from '../componentes/Buscador';
import { PacienteCard } from '../componentes/PacienteCard';
import { PacienteRow } from '../componentes/PacienteRow';
import { Spinner } from '../componentes/Spinner';

const COLUMNAS_TABLA: string[] = [
  'Paciente',
  'Email',
  'Teléfono',
  'Nacimiento',
  'Acciones',
];

export function PaginaPacientes() {
  const { pacientes, total, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');

  const termino = normalizar(busqueda.trim());
  const pacientesFiltrados = pacientes.filter((paciente) =>
    normalizar(nombreCompleto(paciente)).includes(termino),
  );

  return (
    <div className="flex flex-col gap-6 text-left">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Pacientes
        </h1>
        <p className="text-sm text-slate-500">
          Gestión y seguimiento de pacientes registrados
        </p>
        {!cargando && !error && (
          <p className="text-xs font-semibold text-slate-600">
            {total} paciente(s) registrado(s)
          </p>
        )}
      </header>

      {cargando && <Spinner etiqueta="Cargando pacientes..." />}

      {!cargando && error && (
        <div
          role="alert"
          className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-8 text-center"
        >
          <p className="text-sm font-semibold text-red-700">
            No se pudieron cargar los pacientes.
          </p>
          <button
            type="button"
            onClick={recargar}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <BuscadorPacientes value={busqueda} onChange={setBusqueda} />
            {busqueda !== '' && (
              <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                {pacientesFiltrados.length} resultado(s) para la búsqueda
              </p>
            )}
          </section>

          {pacientesFiltrados.length > 0 ? (
            <>
              {/* Móvil: tarjetas verticales */}
              <div className="flex flex-col gap-3 md:hidden">
                {pacientesFiltrados.map((paciente) => (
                  <PacienteCard key={paciente.id} paciente={paciente} />
                ))}
              </div>

              {/* Desktop: tabla */}
              <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50">
                        {COLUMNAS_TABLA.map((columna) => (
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
                        <PacienteRow key={paciente.id} paciente={paciente} />
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
                  ? 'Aún no hay pacientes registrados.'
                  : 'Prueba con otro nombre o apellido.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}