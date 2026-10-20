interface SpinnerProps {
  etiqueta?: string;
}

export function Spinner({ etiqueta = 'Cargando...' }: SpinnerProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-16 text-slate-500"
    >
      <span
        className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"
        aria-hidden="true"
      />
      <span className="text-sm">{etiqueta}</span>
    </div>
  );
}