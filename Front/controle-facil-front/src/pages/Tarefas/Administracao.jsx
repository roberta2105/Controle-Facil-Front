import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";


import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Administracao = () => {

    // const [tarefaData, setTarefaData] = useState({
    //     id: null,
    //     Titulo: '',
    //     Descricao: '',
    //     Status: ''
    // });

    const [tarefas, setTarefas] = useState([]);

    //Faz uma consulta aos dados de Tarefa
    useEffect(() => {
        axios.get('https://654eaeda358230d8f0ccc8a2.mockapi.io/Tarefa')
            .then(resposta => setTarefas(resposta.data))
            .catch(error => console.error('Erro ao buscar tarefas:', error));
    }, []);

    const excluir = (tarefaExcluida) => {
        axios.delete(`https://654eaeda358230d8f0ccc8a2.mockapi.io/Tarefa/${tarefaExcluida.id}/`)
        .then(() => {
            const listaTarefa = tarefas.filter(Tarefa => Tarefa.id !== tarefaExcluida.id)
            setTarefas([ ...listaTarefa])
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
                            Status
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
                            {Tarefa.Titulo}
                        </TableCell>
                        <TableCell>
                            {Tarefa.Descricao}
                        </TableCell>
                        <TableCell>
                            {Tarefa.Status}
                        </TableCell>
                         <TableCell>
                           <Link to={`/Tarefa/${Tarefa.id}`}>
                           <FaEdit style={{ color: '#9400D3', fontSize: "25px" }} />
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
