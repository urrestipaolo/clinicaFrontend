import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLista } from '../hooks/UseLista';
import type { Metrica } from '../types';
import {
  ESTADO_CITA_COMPLETADA,
  ESTADO_CITA_PENDIENTE,
  type Cita,
  type Medico,
  type Paciente,
} from '../types/clinica';
import { MetricCard } from '../componentes/MetricCard';
import { StatusBadge } from '../componentes/StatusBadge';

interface ResultadoMetrica {
  total: number;
  cargando: boolean;
  error: boolean;
}

const valorMetrica = ({
  total,
  cargando,
  error,
}: ResultadoMetrica): number | string => {
  if (cargando) return '—';
  if (error) return 'Error';
  return total;
};

export function PaginaDashboard() {
  const navigate = useNavigate();
  const [mantenimiento, setMantenimiento] = useState(false);

  const pacientes = useLista<Paciente>('/pacientes');
  const medicos = useLista<Medico>('/medicos');
  const programadas = useLista<Cita>('/citas', ESTADO_CITA_PENDIENTE);
  const completadas = useLista<Cita>('/citas', ESTADO_CITA_COMPLETADA);

  const metricas: Metrica[] = [
    {
      id: '1',
      titulo: 'PACIENTES',
      valor: valorMetrica(pacientes),
      descripcion: 'Pacientes registrados',
      tendencia: 'positiva',
      icono: '💉',
    },
    {
      id: '2',
      titulo: 'MÉDICOS',
      valor: valorMetrica(medicos),
      descripcion: 'Médicos de la clínica',
      tendencia: 'neutra',
      icono: '🧑‍⚕️',
    },
    {
      id: '3',
      titulo: 'CITAS PROGRAMADAS',
      valor: valorMetrica(programadas),
      descripcion: 'Citas pendientes de atención',
      tendencia: 'positiva',
      icono: '📅',
    },
    {
      id: '4',
      titulo: 'COMPLETADAS',
      valor: valorMetrica(completadas),
      descripcion: 'Citas ya atendidas',
      tendencia: 'neutra',
      icono: '✅',
    },
  ];

  return (
    <div className="flex flex-col gap-6 text-left">
      {mantenimiento && (
        <div role="alert" className="rounded-lg bg-red-600 p-4 text-white">
          EN MODO DE MANTENIMIENTO 🛠️
        </div>
      )}

      <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Clínica Salud Integral
          </h1>
          <h2 className="text-sm text-slate-500">Dashboard Principal</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge activo={!mantenimiento} />
          <button
            type="button"
            onClick={() => setMantenimiento((prev) => !prev)}
            className="rounded-lg border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-200"
          >
            Mantenimiento
          </button>
          <button
            type="button"
            onClick={() => navigate('/pacientes')}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            Ver Pacientes
          </button>
        </div>
      </header>

      <section
        aria-label="Métricas"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metricas.map((metrica) => (
          <MetricCard key={metrica.id} metrica={metrica} />
        ))}
      </section>
    </div>
  );
}