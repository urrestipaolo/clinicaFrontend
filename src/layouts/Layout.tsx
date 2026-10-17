import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface EnlaceSidebar {
  to: string;
  etiqueta: string;
  end?: boolean;
}

const enlacesSidebar: EnlaceSidebar[] = [
  { to: '/', etiqueta: 'Dashboard', end: true },
  { to: '/pacientes', etiqueta: 'Pacientes' },
  { to: '/citas/nueva', etiqueta: 'Nueva cita' },
];


const claseEnlace = ({ isActive }: { isActive: boolean }): string =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? 'bg-emerald-50 font-semibold text-emerald-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`;

export function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Barra superior: solo en móvil */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <span className="text-sm font-bold text-slate-800">
          Clínica Salud Integral
        </span>
        <button
          type="button"
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          className="rounded-lg px-2 py-1 text-xl text-slate-700 hover:bg-slate-100"
        >
          {menuAbierto ? '✕' : '☰'}
        </button>
      </div>

      {menuAbierto && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={cerrarMenu}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          menuAbierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-slate-100 px-5 py-5">
          <p className="text-base font-bold text-slate-800">Salud Integral</p>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            Centro clínico
          </p>
        </div>

        <nav aria-label="Principal" className="flex flex-col gap-1 p-3">
          {enlacesSidebar.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.end}
              onClick={cerrarMenu}
              className={claseEnlace}
            >
              {enlace.etiqueta}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="md:pl-64">
        <main className="p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}