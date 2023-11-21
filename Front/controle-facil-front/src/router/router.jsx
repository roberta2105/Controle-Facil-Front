import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import PaginaBase from "../pages/PaginaBase";
import Administracao from "../pages/Tarefas/Administracao";
import FormularioTarefas from "../pages/Tarefas/FormularioTarefas";

import { AuthContext } from "../context/auth";

export function Rota() {
  const AuthenticatedRoutes = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <h4>Carregando...</h4>;
  }

  if (authenticated) {
    return (

    <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route path="naturezasdelancamento" element={<Administracao />} />
          <Route path="naturezasdelancamento/:id" element={<FormularioTarefas />} />
          <Route path="naturezasdelancamento/novo" element={<FormularioTarefas />} />
        </Route>
    </Routes>
       );
      } else {
        return (

        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>
      )}
}

return <>{AuthenticatedRoutes()}</>;

}
