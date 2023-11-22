import { useState, useEffect } from 'react';
import http from "../../http/http";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const Titulos = () => {
    const [receber, setReceber] = useState([]);
    const { idNaturezaDeLancamento } = useParams();

    useEffect(() => {
        // Carregando os recebimentos
        http.get(`/areceber?idNaturezaDeLancamento=${idNaturezaDeLancamento}`)
            .then(resposta => {
                setReceber(resposta.data)
            })
            .catch(error => console.error('Erro ao buscar contas a receber:', error));
    }, [idNaturezaDeLancamento]);
    

    const excluir = (receberExcluido) => {
        http.delete(`/areceber/${receberExcluido.id}`)
            .then(() => {
                const listaReceber = receber.filter(receber => receber.id !== receberExcluido.id)
                setReceber([...listaReceber])
                alert("Recebimento deletado com sucesso!")
            })
            .catch(error => console.error('Erro ao excluir recebimento', error));
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
                            Valor original
                        </TableCell>
                        <TableCell>
                            Valor recebido
                        </TableCell>
                        <TableCell>
                            Data referência
                        </TableCell>
                        <TableCell>
                            Data vencimento
                        </TableCell>
                        <TableCell>
                            Data recebimento
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
                {receber.map(receber => <TableRow key={receber.id}>
                        <TableCell>
                            {receber.descricao}
                        </TableCell>
                        <TableCell>
                            {receber.observacao}
                        </TableCell>
                        <TableCell>
                            {receber.valorOriginal}
                        </TableCell>
                        <TableCell>
                            {receber.valorRecebido}
                        </TableCell>
                        <TableCell>
                            {receber.dataReferencia}
                        </TableCell>
                        <TableCell>
                            {receber.dataVencimento}
                        </TableCell>
                        <TableCell>
                            {receber.dataRecebimento}
                        </TableCell>
                        <TableCell>
                            <Link to={`/receber/${receber.id}`}>
                                <FaEdit style={{ color: '#028971', fontSize: "25px" }} />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => excluir(receber)}>
                                <RiDeleteBin2Line style={{ color: 'red', fontSize: "25px" }} />
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>





    )





}

export default Titulos