import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import http from "../../http/http";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Administracao = () => {


    const [tarefas, setTarefas] = useState([]);

    //Faz uma consulta aos dados de Tarefa
    useEffect(() => {
        http.get('naturezasdelancamento')
            .then(resposta => setTarefas(resposta.data))
            .catch(error => console.error('Erro ao buscar tarefas:', error));
    }, []);

    // Função para excluir uma tarefa
    const excluir = (tarefaExcluida) => {
        http.delete(`naturezasdelancamento/${tarefaExcluida.id}`)
            .then(() => {
                const listaTarefa = tarefas.filter(Tarefa => Tarefa.id !== tarefaExcluida.id)
                setTarefas([...listaTarefa])
                alert("Tarefa deletada com sucesso!")
            })
    }

    return (

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Descrição
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tarefas.map(Tarefa => <TableRow key={Tarefa.id}>
                        <TableCell>
                            <Link to={`/receber/${Tarefa.id}`}>
                                {Tarefa.descricao}
                            </Link>
                        </TableCell>
                        <TableCell>
                            {Tarefa.observacao}
                        </TableCell>
                        <TableCell>
                            <Link to={`/naturezasdelancamento/${Tarefa.id}`}>
                                <FaEdit style={{ color: '#028971', fontSize: "25px" }} />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => excluir(Tarefa)}>
                                <RiDeleteBin2Line style={{ color: 'red', fontSize: "25px" }} />
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>





    )



}

export default Administracao
