import { Link } from 'react-router-dom';

export function Pagina404() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="text-6xl" aria-hidden="true">
        Buscando...
      </span>
      <h1 className="text-5xl font-extrabold text-slate-800">404</h1>
      <p className="max-w-sm text-sm text-slate-500">
        ERROR 404 la pagina no existe.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
      >
        Ir al inicio
      </Link>
    </div>
  );
}