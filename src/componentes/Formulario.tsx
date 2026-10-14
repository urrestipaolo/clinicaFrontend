import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { estadoPacientex, etiquetaPacientex, estadoPaciente } from '../contenido-informacion/estadoPaciente';
import type { EstadoPaciente, Paciente } from '../types/paciente';

interface FormularioPaciente {
  onAgregar: (paciente: Paciente) => void;
}

interface ErroresFormulario {
  nombre?: string;
  email?: string;
}


const datosPendientes: Pick<Paciente, 'telefono' | 'especialidadAsignada' | 'ultimaCita'> = {
  telefono: 'Sin registrar',
  especialidadAsignada: 'Sin asignar',
  ultimaCita: 'Sin citas',
};

const claseInput = (er: boolean): string =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${
    er
      ? 'border-rose-300 focus:ring-rose-300/40'
      : 'border-slate-200 focus:ring-emerald-600/20'
  }`;

interface CampoProps {
  id: string;
  etiqueta: string;
  error?: string;
  children: ReactNode;
}

function Campo({ id, etiqueta, error, children }: CampoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-slate-700">
        {etiqueta}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormularioPaciente({ onAgregar }: FormularioPaciente) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<EstadoPaciente>('activo');
  const [errores, setErrores] = useState<ErroresFormulario>({});

  const manejarEstado = (evento: ChangeEvent<HTMLSelectElement>) => {
    const valor = evento.target.value;
    if (estadoPaciente(valor)) setEstado(valor);
  };

  const manejarSubmit = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const nuevosErrores: ErroresFormulario = {};
    if (!nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!email.trim()) nuevosErrores.email = 'El email es obligatorio';

    if (nuevosErrores.nombre || nuevosErrores.email) {
      setErrores(nuevosErrores);
      return;
    }

    onAgregar({
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      email: email.trim(),
      estado,
      ...datosPendientes,
    });

    setNombre('');
    setApellido('');
    setEmail('');
    setEstado('activo');
    setErrores({});
  };

  return (
    <form
      onSubmit={manejarSubmit}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h2 className="mb-3 text-sm font-semibold text-slate-800">
        Agregar paciente
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Campo id="paciente-nombre" etiqueta="Nombre *" error={errores.nombre}>
          <input
            id="paciente-nombre"
            type="text"
            value={nombre}
            onChange={(evento: ChangeEvent<HTMLInputElement>) =>
              setNombre(evento.target.value)
            }
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? 'paciente-nombre-error' : undefined}
            placeholder="Ej: Laura"
            className={claseInput(Boolean(errores.nombre))}
          />
        </Campo>

        <Campo id="paciente-apellido" etiqueta="Apellido">
          <input
            id="paciente-apellido"
            type="text"
            value={apellido}
            onChange={(evento: ChangeEvent<HTMLInputElement>) =>
              setApellido(evento.target.value)
            }
            placeholder="Ej: Morales Pérez"
            className={claseInput(false)}
          />
        </Campo>

        <Campo id="paciente-email" etiqueta="Email *" error={errores.email}>
          <input
            id="paciente-email"
            type="email"
            value={email}
            onChange={(evento: ChangeEvent<HTMLInputElement>) =>
              setEmail(evento.target.value)
            }
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? 'paciente-email-error' : undefined}
            placeholder="tu@correo.com"
            className={claseInput(Boolean(errores.email))}
          />
        </Campo>

        <Campo id="paciente-estado" etiqueta="Estado">
          <select
            id="paciente-estado"
            value={estado}
            onChange={manejarEstado}
            className={claseInput(false)}
          >
            {estadoPacientex.map((opcion) => (
              <option key={opcion} value={opcion}>
                {etiquetaPacientex[opcion]}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
        >
          Agregar paciente
        </button>
      </div>
    </form>
  );
}