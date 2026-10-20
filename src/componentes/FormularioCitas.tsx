import { useState } from 'react';
import type { ReactNode } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMedicos } from '../hooks/useMedicos';
import { usePacientes } from '../hooks/usePacientes';
import { citaSchema, type CitaFormData } from '../schemas/citaSchema';
import { ESTADO_CITA_PENDIENTE } from '../types/clinica';
import { formatearFecha, nombreCompleto } from '../hooks/formato';

interface FormularioCitaProps {
  onCancelar: () => void;
}

const VALORES_INICIALES: CitaFormData = {
  pacienteId: '',
  medicoId: '',
  fecha: '',
};

const TIEMPO_ENVIO_SIMULADO_MS = 1500;

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

export function FormularioCita({ onCancelar }: FormularioCitaProps) {
  const {
    pacientes,
    cargando: cargandoPacientes,
    error: errorPacientes,
    recargar: recargarPacientes,
  } = usePacientes();
  const {
    medicos,
    cargando: cargandoMedicos,
    error: errorMedicos,
    recargar: recargarMedicos,
  } = useMedicos();
  const [citaConfirmada, setCitaConfirmada] = useState<CitaFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: VALORES_INICIALES,
  });

  const onSubmit: SubmitHandler<CitaFormData> = async (datos) => {
    // Envío simulado. Cuando el backend tenga POST /citas, reemplaza la espera
    // por: await api.post('/citas', {
    //   pacienteId: Number(datos.pacienteId),
    //   medicoId: Number(datos.medicoId),
    //   fecha: datos.fecha,
    // });
    await new Promise<void>((resolver) =>
      setTimeout(resolver, TIEMPO_ENVIO_SIMULADO_MS),
    );
    setCitaConfirmada(datos);
  };

  const agendarOtraCita = () => {
    reset(VALORES_INICIALES);
    setCitaConfirmada(null);
  };

  const reintentarCarga = () => {
    if (errorPacientes) recargarPacientes();
    if (errorMedicos) recargarMedicos();
  };

  if (citaConfirmada) {
    const paciente = pacientes.find(
      (p) => String(p.id) === citaConfirmada.pacienteId,
    );
    const medico = medicos.find((m) => String(m.id) === citaConfirmada.medicoId);

    const resumen = [
      {
        etiqueta: 'Paciente',
        valor: paciente ? nombreCompleto(paciente) : citaConfirmada.pacienteId,
      },
      {
        etiqueta: 'Médico',
        valor: medico
          ? medico.especialidad
            ? `${medico.medico} (${medico.especialidad.especialidad})`
            : medico.medico
          : citaConfirmada.medicoId,
      },
      { etiqueta: 'Fecha', valor: formatearFecha(citaConfirmada.fecha) },
      { etiqueta: 'Estado', valor: ESTADO_CITA_PENDIENTE },
    ];

    return (
      <section
        role="status"
        className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-emerald-800">
          ¡Cita agendada con éxito!
        </h2>
        <p className="mb-4 text-sm text-emerald-700">
          Estos son los datos de la cita:
        </p>

        <dl className="flex flex-col gap-2 rounded-lg bg-white p-4 text-sm">
          {resumen.map((dato) => (
            <div
              key={dato.etiqueta}
              className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4"
            >
              <dt className="font-semibold text-slate-500">{dato.etiqueta}</dt>
              <dd className="capitalize text-slate-800 sm:text-right">
                {dato.valor}
              </dd>
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
      {(errorPacientes || errorMedicos) && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <span>No se pudieron cargar los pacientes o los médicos.</span>
          <button
            type="button"
            onClick={reintentarCarga}
            className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      <Campo
        id="cita-paciente"
        etiqueta="Paciente"
        error={errors.pacienteId?.message}
      >
        <select
          id="cita-paciente"
          aria-invalid={Boolean(errors.pacienteId)}
          aria-describedby={errors.pacienteId ? 'cita-paciente-error' : undefined}
          className={claseControl(Boolean(errors.pacienteId))}
          {...register('pacienteId')}
        >
          {cargandoPacientes ? (
            <option value="" disabled>
              Cargando pacientes...
            </option>
          ) : (
            <>
              <option value="">Selecciona un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {nombreCompleto(paciente)}
                </option>
              ))}
            </>
          )}
        </select>
      </Campo>

      <Campo id="cita-medico" etiqueta="Médico" error={errors.medicoId?.message}>
        <select
          id="cita-medico"
          aria-invalid={Boolean(errors.medicoId)}
          aria-describedby={errors.medicoId ? 'cita-medico-error' : undefined}
          className={claseControl(Boolean(errors.medicoId))}
          {...register('medicoId')}
        >
          {cargandoMedicos ? (
            <option value="" disabled>
              Cargando médicos...
            </option>
          ) : (
            <>
              <option value="">Selecciona un médico</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.especialidad
                    ? `${medico.medico} — ${medico.especialidad.especialidad}`
                    : medico.medico}
                </option>
              ))}
            </>
          )}
        </select>
      </Campo>

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