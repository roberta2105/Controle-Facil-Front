import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import http from "../../http/http"


const FormularioReceber = () => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valorOriginal, setValorOriginal] = useState('')
    const [valorRecebido, setValorRecebido] = useState('')
    const [dataReferencia, setDataReferencia] = useState('')
    const [dataVencimento, setDataVencimento] = useState('')
    const [dataRecebimento, setDataReceber] = useState('')

    const navigate = useNavigate(); // Hook de navegação
    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get(`/receber/${parametros.id}/`)
                .then(resposta => {
                    setNome(resposta.data.descricao),
                    setDescricao(resposta.data.observacao),
                    setValorOriginal(resposta.data.valorOriginal),
                    setValorRecebido(resposta.data.valorRecebido),
                    setDataReferencia(resposta.data.dataReferencia),
                    setDataVencimento(resposta.data.dataVencimento),
                    setDataReceber(resposta.data.dataRecebimento)
                })

                .catch(error => console.error('Erro ao buscar recebimento:', error));
        }
    }, [parametros])

    const SubmeterForm = (evento) => {
        evento.preventDefault()


        if (parametros.id) {
            http.put(`/receber/${parametros.id}/`, {
                descricao: nome,
                observacao: descricao,
                valorOriginal: valorOriginal,
                valorRecebido: valorRecebido,
                dataReferencia: dataReferencia,
                dataVencimento: dataVencimento,
                dataRecebimento: dataRecebimento
            })
                .then(() => {
                    alert("Recebimento atualizado com sucesso!")
                })
        } else {
            http.post('/receber', {
                descricao: nome,
                observacao: descricao,
                valorOriginal: valorOriginal,
                valorRecebido: valorRecebido,
                dataReferencia: dataReferencia,
                dataVencimento: dataVencimento,
                dataRecebimento: dataRecebimento
            })
                .then(() => {
                    alert("Recebimento cadastrado com sucesso!")
                    navigate('/receber');
                })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
            <Typography sx={{ padding: 3 }} component="h1" variant="h6">Formulário de Recebimentos</Typography>
            <Box component="form" sx={{ width: '80%', height: '300px' }} onSubmit={SubmeterForm}>
                <TextField
                    value={nome}
                    onChange={evento => setNome(evento.target.value)}
                    label="Nome do recebimento"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={descricao}
                    onChange={evento => setDescricao(evento.target.value)}
                    label="Descrição"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                    <TextField
                    value={valorOriginal}
                    onChange={evento => setValorOriginal(evento.target.value)}
                    label="Valor Original"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                    <TextField
                    value={valorRecebido}
                    onChange={evento => setValorRecebido(evento.target.value)}
                    label="Valor Recebido"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                    <TextField
                    value={dataReferencia}
                    onChange={evento => setDataReferencia(evento.target.value)}
                    label="Data Referência"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                    <TextField
                    value={dataVencimento}
                    onChange={evento => setDataVencimento(evento.target.value)}
                    label="Vencimento"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                    <TextField
                    value={dataRecebimento}
                    onChange={evento => setDataReceber(evento.target.value)}
                    label="Recebimento"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <Button sx={{ marginTop: 1 }}
                    type="submit"
                    variant="outlined"
                    fullWidth>Enviar</Button>
            </Box>
        </Box>
    )



}

export default FormularioReceber