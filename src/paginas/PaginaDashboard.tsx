import { useState } from 'react';
import { Metrica } from '../types';
import { StatusBadge } from '../componentes/StatusBadge';
import { MetricCard } from '../componentes/MetricCard';

export function PaginaDashboard() {

  const [mantenimiento, setMantenimiento] = useState(false);


  const [pacientes, setPacientes] = useState(3);

  const incrementarPacientes = () => setPacientes((prev) => prev + 1);
  const decrementarPacientes = () => setPacientes((prev) => Math.max(0, prev - 1));


  const metricas: Metrica[] = [
    {
      id: "1",
      titulo: "PACIENTES",
      valor: pacientes,
      descripcion: "Pacientes que hay registrados",
      tendencia: "positiva",
      icono: "💉",
    },
    {
      id: "2",
      titulo: "CITAS",
      valor: 42,
      descripcion: "8 citas canceladas",
      tendencia: "negativa",
      icono: "📅",
    },
    {
      id: "3",
      titulo: "CONSULTAS",
      valor: 15,
      descripcion: "Dentro del rango normal",
      tendencia: "neutra",
      icono: "📓",
    },
    {
      id: "4",
      titulo: "DISPONIBLIDAD",
      valor: 25,
      descripcion: "Disponibilidad medica para atención",
      tendencia: "positiva",
      icono: "🧑‍⚕️",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {mantenimiento && (
        <div className="bg-red-600 text-white p-6">
          EN MODO DE MANTENIMIENTO 🛠️
        </div>
      )}


      <header className="p-4 border rounded-lg bg-amber-100">
        <div>
          <h1 className="p-4 border rounded-lg bg-amber-100 ">
            <p className='text-gray-950'>
              Clínica Salud Integral
            </p>
            </h1>
          <h2 className="p-4 border rounded-lg bg-amber-100">Dashboard Principal</h2>
        </div>

        <div className="flex items-center gap-4">
          <StatusBadge activo={!mantenimiento} />
          
          <button
            onClick={() => setMantenimiento(!mantenimiento)}
            className="p-5 border rounded-lg bg-amber-500"
          >
            MANTENIMIENTO
          </button>
        </div>
      </header>


      <section className="text 2x1 p-4 border rounded-lg bg-amber-100">
        <p className="p-4 border rounded-lg bg-amber-100">Controles de Pacientes:</p>
        <div className="p-4 border rounded-lg bg-amber-100">
          <button
            onClick={decrementarPacientes}
            className="p-4 border rounded-lg bg-amber-100"
          >
            ➖
          </button>
          <button
            onClick={incrementarPacientes}
            className="p-4 border rounded-lg bg-amber-100"
          >
            ➕
          </button>
        </div>
      </section>


      <h5 className="text 5x1 p-4 border rounded-lg bg-amber-100">
        {metricas.map((metrica) => (
          <MetricCard key={metrica.id} metrica={metrica} />
        ))}
      </h5>
</div>
  );
}
