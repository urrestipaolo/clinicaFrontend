import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface RespuestaLista<T> {
  data: T[];
  total?: number;
  totalPacientes?: number;
  totalMedicos?: number;
  totalCitas?: number;
}

interface UseListaResultado<T> {
  datos: T[];
  total: number;
  cargando: boolean;
  error: boolean;
  recargar: () => void;
}

export function useLista<T>(
  ruta: string,
  estado?: string,
): UseListaResultado<T> {
  const [datos, setDatos] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    setCargando(true);
    setError(false);

    api
      .get<RespuestaLista<T> | T[]>(ruta, {
        params: estado ? { estado } : undefined,
        signal: controlador.signal,
      })
      .then((respuesta) => {
        const cuerpo = respuesta.data;

        if (Array.isArray(cuerpo)) {
          setDatos(cuerpo);
          setTotal(cuerpo.length);
        } else {
          setDatos(cuerpo.data);
          setTotal(
            cuerpo.total ??
              cuerpo.totalPacientes ??
              cuerpo.totalMedicos ??
              cuerpo.totalCitas ??
              cuerpo.data.length,
          );
        }
      })
      .catch((e: unknown) => {
        if (!axios.isCancel(e)) {
          setError(true);
        }
      })
      .finally(() => {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      });

    return () => controlador.abort();
  }, [ruta, estado, intento]);

  const recargar = () => {
    setCargando(true);
    setError(false);
    setIntento((n) => n + 1);
  };

  return { datos, total, cargando, error, recargar };
}