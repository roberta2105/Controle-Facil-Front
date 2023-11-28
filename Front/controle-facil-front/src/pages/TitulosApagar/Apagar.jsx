import { useState, useEffect } from 'react';
import http from "../../http/http";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AlertTitle, Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const TitulosApagar = () => {
    const [pagar, setPagar] = useState([]);
    const { idNaturezaDeLancamento } = useParams();
    const [Sucess, setSucess] = useState(false);

    useEffect(() => {
        http.get(`/apagar?idNaturezaDeLancamento=${idNaturezaDeLancamento}`)
            .then(resposta => {
                setPagar(resposta.data)
            })
            .catch(error => console.error('Erro ao buscar contas a pagar:', error));
    }, [idNaturezaDeLancamento]);

    const excluir = (pagarExcluido) => {
        http.delete(`/apagar/${pagarExcluido.id}`)
            .then(() => {
                const listaPagar = pagar.filter(pagar => pagar.id !== pagarExcluido.id)
                setPagar([...listaPagar])
                setSucess(true);
                setTimeout(() => {
                    setSucess(false);
                }, 1500); // Tempo em milissegundos
            })
            .catch(error => console.error('Erro ao excluir o pagamento', error))
    }

    return (
        <TableContainer component={Paper}>
            {Sucess && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Sucesso</AlertTitle>
                    Pagamento deletado com sucesso!
                </Alert>
            )}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Pagamento
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
                            Data pagamento
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
                    {pagar.map(pagar => <TableRow key={pagar.id}>
                        <TableCell>
                            {pagar.descricao}
                        </TableCell>
                        <TableCell>
                            {pagar.observacao}
                        </TableCell>
                        <TableCell>
                            {pagar.valorOriginal}
                        </TableCell>
                        <TableCell>
                            {pagar.valorPago}
                        </TableCell>
                        <TableCell>
                            {pagar.dataReferencia}
                        </TableCell>
                        <TableCell>
                            {pagar.dataVencimento}
                        </TableCell>
                        <TableCell>
                            {pagar.dataPagamento}
                        </TableCell>
                        <TableCell>
                            <Link to={`/apagar/:tipo/${pagar.id}`}>
                                <FaEdit style={{ color: '#028971', fontSize: "25px" }} />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => excluir(pagar)}>
                                <RiDeleteBin2Line style={{ color: 'red', fontSize: "25px" }} />
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default TitulosApagar