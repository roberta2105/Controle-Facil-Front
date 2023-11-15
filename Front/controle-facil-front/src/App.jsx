import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import Administracao from './pages/Tarefas/Administracao';
import FormularioTarefas from './pages/Tarefas/FormularioTarefas';
import PaginaBase from './pages/PaginaBase';


function App () {



    return (
        <BrowserRouter>
        <Routes>

            <Route path="/" element={<PaginaBase />}>
            <Route path="Tarefa" element={<Administracao />} />
            <Route path="Tarefa/:id" element={<FormularioTarefas />} />
            <Route path="Tarefa/novo" element={<FormularioTarefas />} />
           
        </Route>
        </Routes>
        </BrowserRouter>
    )








}

export default App
