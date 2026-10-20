import type { Medico } from '../types/clinica';
import { useLista } from './UseLista';

export function useMedicos() {
  const { datos, total, cargando, error, recargar } =
    useLista<Medico>('/medicos');
  return { medicos: datos, total, cargando, error, recargar };
}