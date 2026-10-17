import { useState } from 'react';
import type { ReactNode } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useMedicos } from '../hooks/useMedicos';
import { zodResolver } from '@hookform/resolvers/zod';
import { CitaFormData, citaSchema, nivelUrgencia, Urgencia } from '../schemas/citaSchema';


const valorCita: CitaFormData = {
  pacienteNombre: '',
  medicoId: '',
  fecha: '',
  hora: '',
  motivo: '',
  urgencia: 'media',
};

const etiquetaUrgencia: Record<Urgencia, string> = {
  baja: 'Baja',
  media: 'Media',
  alta: 'Alta',
  critica: 'Crítica',
};

const tiempoSimulado = 1500;

const claseControl = (hayError: boolean): string =>
  `w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${
    hayError
      ? 'border-red-500 focus:ring-red-500/30'
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
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormularioCitaProps {
  onCancelar: () => void;
}

export function FormularioCita({ onCancelar }: FormularioCitaProps) {
  const { medicos, cargando } = useMedicos();
  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: valorCita,
  });

  const onSubmit: SubmitHandler<CitaFormData> = async (datos) => {
    await new Promise<void>((resolver) =>
      setTimeout(resolver, tiempoSimulado),
    );
    setCitaConfirmada(datos);
  };

  const agendarOtraCita = () => {
    reset(valorCita);
    setCitaConfirmada(null);
  };

  if (citaConfirmada) {
    const medico = medicos.find((m) => m.id === citaConfirmada.medicoId);
    const resumen = [
      { etiqueta: 'Paciente', valor: citaConfirmada.pacienteNombre },
      {
        etiqueta: 'Médico',
        valor: medico
          ? `${medico.nombre} (${medico.especialidad})`
          : citaConfirmada.medicoId,
      },
      { etiqueta: 'Fecha', valor: citaConfirmada.fecha },
      { etiqueta: 'Hora', valor: citaConfirmada.hora },
      { etiqueta: 'Urgencia', valor: etiquetaUrgencia[citaConfirmada.urgencia] },
      { etiqueta: 'Motivo', valor: citaConfirmada.motivo },
    ];

    return (
      <section
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-emerald-800">
          La cita ha sido agendada, llegue temprano para no agarrar cola jaja..
        </h2>
        <p className="mb-4 text-sm text-emerald-700">
          Esta es la información de la cita:
        </p>

        <dl className="flex flex-col gap-2 rounded-lg bg-white p-4 text-sm">
          {resumen.map((dato) => (
            <div
              key={dato.etiqueta}
              className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4"
            >
              <dt className="font-semibold text-slate-500">{dato.etiqueta}</dt>
              <dd className="text-slate-800 sm:text-right">{dato.valor}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={agendarOtraCita}
          className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
        >
          Agendar otra cita
        </button>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <Campo
        id="cita-paciente"
        etiqueta="Paciente (Nombres y Apellidos)"
        error={errors.pacienteNombre?.message}
      >
        <input
          id="cita-paciente"
          type="text"
          placeholder="ejemplo: Paolo Urresti"
          aria-invalid={Boolean(errors.pacienteNombre)}
          aria-describedby={errors.pacienteNombre ? 'cita-paciente-error' : undefined}
          className={claseControl(Boolean(errors.pacienteNombre))}
          {...register('pacienteNombre')}
        />
      </Campo>

      <Campo id="cita-medico" etiqueta="Médico" error={errors.medicoId?.message}>
        <select
          id="cita-medico"
          aria-invalid={Boolean(errors.medicoId)}
          aria-describedby={errors.medicoId ? 'cita-medico-error' : undefined}
          className={claseControl(Boolean(errors.medicoId))}
          {...register('medicoId')}
        >
          {cargando ? (
            <option value="" disabled>
              Cargando médicos...
            </option>
          ) : (
            <>
              <option value="">Selecciona un médico</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.nombre} — {medico.especialidad}
                </option>
              ))}
            </>
          )}
        </select>
      </Campo>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo id="cita-fecha" etiqueta="Fecha" error={errors.fecha?.message}>
          <input
            id="cita-fecha"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            aria-invalid={Boolean(errors.fecha)}
            aria-describedby={errors.fecha ? 'cita-fecha-error' : undefined}
            className={claseControl(Boolean(errors.fecha))}
            {...register('fecha')}
          />
        </Campo>

        <Campo id="cita-hora" etiqueta="Hora" error={errors.hora?.message}>
          <input
            id="cita-hora"
            type="time"
            aria-invalid={Boolean(errors.hora)}
            aria-describedby={errors.hora ? 'cita-hora-error' : undefined}
            className={claseControl(Boolean(errors.hora))}
            {...register('hora')}
          />
        </Campo>
      </div>

      <Campo id="cita-urgencia" etiqueta="Urgencia" error={errors.urgencia?.message}>
        <select
          id="cita-urgencia"
          aria-invalid={Boolean(errors.urgencia)}
          aria-describedby={errors.urgencia ? 'cita-urgencia-error' : undefined}
          className={claseControl(Boolean(errors.urgencia))}
          {...register('urgencia')}
        >
          {nivelUrgencia.map((nivel) => (
            <option key={nivel} value={nivel}>
              {etiquetaUrgencia[nivel]}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="cita-motivo" etiqueta="Motivo de la consulta" error={errors.motivo?.message}>
        <textarea
          id="cita-motivo"
          rows={4}
          placeholder="Describe brevemente el motivo de la cita (mínimo 10 caracteres)"
          aria-invalid={Boolean(errors.motivo)}
          aria-describedby={errors.motivo ? 'cita-motivo-error' : undefined}
          className={claseControl(Boolean(errors.motivo))}
          {...register('motivo')}
        />
      </Campo>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancelar}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-emerald-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Agendando...' : 'Agendar cita'}
        </button>
      </div>
    </form>
  );
}