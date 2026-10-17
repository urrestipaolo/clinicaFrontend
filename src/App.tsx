import { PaginaPacientes } from './paginas/PaginaPacientes';
import "./App.css";
import { PaginaNuevaCita } from './paginas/PaginaCitas';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/layout';
import { PaginaDashboard } from './paginas/PaginaDashboard';
import { PaginaDetallePaciente } from './paginas/PaginaDetallePacientes';
import { Pagina404 } from './paginas/Pagina404';


function App() {
  return(
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<PaginaDashboard/>}/>
        <Route path='/pacientes' element={<PaginaPacientes/>}/>
        <Route path='/pacientes/:id' element={<PaginaDetallePaciente/>}/>
        <Route path='/citas/nueva' element={<PaginaNuevaCita/>}/>
        <Route path='*' element={<Pagina404/>}/>
      </Route>
    </Routes>
  )
}

export default App;
