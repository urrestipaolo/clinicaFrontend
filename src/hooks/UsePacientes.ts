import type { Paciente } from '../types/clinica';
import { useLista } from './UseLista';

export function usePacientes() {
  const { datos, total, cargando, error, recargar } =
    useLista<Paciente>('/pacientes');
  return { pacientes: datos, total, cargando, error, recargar };
}