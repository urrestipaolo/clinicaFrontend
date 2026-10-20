import { api } from '../lib/axios'
import { useEffect, useState } from 'react'
import { Paciente } from '../types/clinica';

function PaginaPacientesDos() {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)

    const cargarPacientes = () => {
    api.get('/pacientes')
      .then((res) => setPacientes(res.data.products))
      .catch(() => setError(true))
      .finally(() => setCargando(false));
  };
    
    useEffect(() => {
        cargarPacientes();
    } ,[])
    
    const reintentar = () => {
        setCargando(true)
        setError(false)
        cargarPacientes();
    }


    if (cargando) return <p> Pagina esta cargando .....</p>

    if (error)
        return (
            <>
                <p>No se pudieron cargar los datos</p>
                <button onClick={reintentar}> Reintentar</button>
            </>
        )

    return (
        <>
            <p>{pacientes.length} producto(s) mostrado(s)</p>
            <ul>
                {pacientes.map(p => (
                    <li key={p.id}>{p.nombre} — ${p.apPaterno}</li>
                ))}
            </ul>
        </>
    )
}

export default PaginaPacientesDos