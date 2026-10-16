import { useEffect, useState } from 'react';
import { listaMedicos } from '../contenido-informacion/lista-medicos';
import type { Medico } from '../types/medicos';

const tiempoRetraso = 800;

interface UseMedicosResultado {
  medicos: Medico[];
  cargando: boolean;
}

export function useMedicos(): UseMedicosResultado {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMedicos(listaMedicos);
      setCargando(false);
    }, tiempoRetraso);


    return () => clearTimeout(timer);
  }, []);

  return { medicos, cargando };
}