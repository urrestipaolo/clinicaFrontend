interface StatusBadge {
  activo: boolean;
}

export function StatusBadge({ activo }: StatusBadge) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${activo ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {activo ? 'Sistema Operativo' : 'Modo Mantenimiento'}
    </span>
  );
}