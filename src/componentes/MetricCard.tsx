import { Metrica, Tendencia } from "../types";


interface MetricCard {
  metrica: Metrica;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: 'text-emerald-600',
  negativa: 'text-rose-600',
  neutra: 'text-slate-600',
};

export function MetricCard({ metrica }: MetricCard) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">

      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-500 font-medium text-sm">
            {metrica.titulo}
        </span>
        <span className="text-2xl">
            {metrica.icono}
        </span>


      </div>
        <div className="text-3xl font-bold text-slate-800 mb-1">
            {metrica.valor}
        </div>

        <p className={`text-xs font-semibold `}>
            {metrica.descripcion}
        </p>
    </div>
  );
}