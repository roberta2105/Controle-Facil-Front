import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login"; // Seu componente de login
import PaginaBase from "../pages/PaginaBase"; // Sua página base
import Administracao from "../pages/Tarefas/Administracao"; // Sua página de administração
import FormularioTarefas from "../pages/Tarefas/FormularioTarefas"; // Seu formulário de tarefas


const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica se o usuário está autenticado

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />} // Redireciona para a página de login se não estiver autenticado
    />
  );
};


const Rota = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<PaginaBase />} >
      <Route path="naturezasdelancamento" element={<Administracao />} />
      <Route path="naturezasdelancamento/:id" element={<FormularioTarefas />} />
      <Route path="naturezasdelancamento/novo" element={<FormularioTarefas />} />
   
      </Route>
   
   
    </Routes>
  </BrowserRouter>
);

export default Rota;