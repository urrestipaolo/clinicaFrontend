import { useMemo, useState } from 'react'; 
import { listaPacientes } from '../contenido-informacion/lista-pacientes';
import { BuscadorPacientes } from './Buscador';
import { PacienteCard } from './PacienteCard';
import { PacienteRow } from './PacienteRow';

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

export function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState('');

  const pacientesFiltrados = useMemo(() => {
    const termino = normalizar(busqueda.trim());
    if (!termino) return listaPacientes;
    return listaPacientes.filter((paciente) =>
      normalizar(`${paciente.nombre} ${paciente.apellido}`).includes(termino),
    );
  }, [busqueda]);

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
        <p className="text-xs font-semibold text-slate-600">
          {pacientesFiltrados.length} de {listaPacientes.length} pacientes
        </p>
      </header>

      <BuscadorPacientes value={busqueda} onChange={setBusqueda} />

      {hayResultados ? (
        <>
          <div className="flex flex-col gap-3 md:hidden">
            {pacientesFiltrados.map((paciente) => (
              <PacienteCard key={paciente.id} paciente={paciente} />
            ))}
          </div>


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
            Intenta buscar con otro nombre o apellido
          </p>
        </div>
      )}
    </div>
  );
}