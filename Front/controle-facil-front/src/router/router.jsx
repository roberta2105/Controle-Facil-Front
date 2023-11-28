import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import PaginaBase from "../pages/PaginaBase";
import Administracao from "../pages/Tarefas/Administracao";
import FormularioTarefas from "../pages/Tarefas/FormularioTarefas";
import Cadastro from "../pages/Cadastro/Cadastro";
import Titulos from "../pages/Titulos/Titulos";

import { AuthContext } from "../context/auth";
import FormularioReceber from "../pages/Titulos/FormularioReceber";
import TitulosApagar from "../pages/TitulosApagar/Apagar";
import FormularioPagar from "../pages/TitulosApagar/FormularioPagar";



export function Rota() {
  const AuthenticatedRoutes = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <h4>Carregando...</h4>;
  }

  if (authenticated) {
    return (

    <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<PaginaBase />}>
          <Route path="/naturezasdelancamento" element={<Administracao />} />
          <Route path="/naturezasdelancamento/:id" element={<FormularioTarefas />} />
          <Route path="/naturezasdelancamento/novo" element={<FormularioTarefas />} />
          <Route path="/areceber/:idNaturezaDeLancamento" element={<Titulos />} />
          <Route path="/areceber/:tipo/:id" element={<FormularioReceber />} />
          <Route path="/areceber/novo" element={<FormularioReceber />} />
          <Route path="/apagar/:idNaturezaDeLancamento" element={<TitulosApagar />} />
          <Route path="/apagar/:tipo/:id" element={<FormularioPagar />} />
          <Route path="/apagar/novo" element={<FormularioPagar />} />
        </Route>
    </Routes>
       );
      } else {
        return (

        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      )}
}

return <>{AuthenticatedRoutes()}</>;

}
