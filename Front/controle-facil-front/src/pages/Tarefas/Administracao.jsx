import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import http from "../../http/http";
import { AlertTitle, Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Administracao = () => {


    const [tarefas, setTarefas] = useState([]);
    const [Sucess, setSucess] = useState(false);

    //Faz uma consulta aos dados de Tarefa
    useEffect(() => {
        http.get('naturezasdelancamento')
            .then(resposta => setTarefas(resposta.data))
            .catch(error => console.error('Erro ao buscar lançamentos:', error));
    }, []);

    // Função para excluir uma tarefa
    const excluir = (tarefaExcluida) => {
        http.delete(`naturezasdelancamento/${tarefaExcluida.id}`)
            .then(() => {
                const listaTarefa = tarefas.filter(Tarefa => Tarefa.id !== tarefaExcluida.id)
                setTarefas([...listaTarefa])
                setSucess(true);
                setTimeout(() => {
                    setSucess(false); 
                  }, 1500); // Tempo em milissegundos

            })
            .catch(error => console.error('Erro ao buscar lançamentos:', error));
    }

    return (

        <TableContainer component={Paper}>
            {Sucess && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Sucesso</AlertTitle>
                   Lançamento deletado com sucesso!
                </Alert>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Lançamento
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
                        <TableCell>
                        </TableCell>
                        <TableCell>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tarefas.map(Tarefa => <TableRow key={Tarefa.id}>
                        <TableCell>
                            {Tarefa.descricao}
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
                        <TableCell>
                            <Link to={`/areceber/${Tarefa.id}`}>Recebimentos</Link>
                        </TableCell>
                        <TableCell>
                            <Link to={`/apagar/${Tarefa.id}`}>Pagamentos</Link>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>





    )



}

export default Administracao
