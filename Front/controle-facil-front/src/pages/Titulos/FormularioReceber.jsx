import { Box, Button, TextField, Typography, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import http from "../../http/http"


const FormularioReceber = () => {

    const [lancamento, setLancamento] = useState('')
    const [lancamentoOptions, setLancamentoOptions] = useState([]);
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
            http.get(`/areceber/${parametros.id}/`)
                .then(resposta => {
                    setLancamento(resposta.data.idNaturezaDeLancamento),
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

    useEffect(() => {
        http.get('naturezasdelancamento')
            .then(resposta => {
                setLancamentoOptions(resposta.data);
            })
            .catch(error => console.error('Erro ao buscar lançamento:', error));
    }, []);

const SubmeterForm = (evento) => {
    evento.preventDefault()

    if (parametros.id) {
        http.put(`/areceber/${parametros.id}/`, {
            idNaturezaDeLancamento: lancamento,
            descricao: nome,
            observacao: descricao,
            valorOriginal: valorOriginal,
            valorRecebido: valorRecebido,
            dataReferencia: dataReferencia,
            dataVencimento: dataVencimento,
            dataRecebimento: dataRecebimento
        })
            .then(() => {
                alert("Recebimento atualizado com sucesso!");

                navigate('/naturezasdelancamento');
            })
            .catch(error => console.error('Erro ao na atualização do recebimento:', error));

    } else {

        http.post('/areceber', {
            idNaturezaDeLancamento: lancamento,
            descricao: nome,
            observacao: descricao,
            valorOriginal: valorOriginal,
            valorRecebido: valorRecebido,
            dataReferencia: dataReferencia,
            dataVencimento: dataVencimento,
            dataRecebimento: dataRecebimento
        })
            .then(() => {
                alert("Recebimento cadastrado com sucesso!");
                navigate('/naturezasdelancamento');
            })
            .catch(error => console.error('Erro ao na cadastro do recebimento:', error));

    }
}

return (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ marginTop: '6%' }} component="h1" variant="h6">Formulário de Recebimentos</Typography>
        <Box component="form" sx={{ padding: '50px' }} onSubmit={SubmeterForm}>
            <TextField
                select
                value={lancamento}
                onChange={evento => setLancamento(evento.target.value)}
                label="Selecione o Lançamento"
                variant="standard"
                fullWidth
                required
                margin="dense"
            >
                {lancamentoOptions.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.descricao}
                    </MenuItem>
                ))}
            </TextField>
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
            <TextField InputLabelProps={{ shrink: true }}
                value={dataReferencia}
                onChange={evento => setDataReferencia(evento.target.value)}
                label="Data Referência"
                type="datetime-local"
                variant="standard"
                fullWidth
                required
                margin="dense"
            />
            <TextField InputLabelProps={{ shrink: true }}
                value={dataVencimento}
                onChange={evento => setDataVencimento(evento.target.value)}
                label="Vencimento"
                type="datetime-local"
                variant="standard"
                fullWidth
                required
                margin="dense"
            />
            <TextField InputLabelProps={{ shrink: true }}
                value={dataRecebimento}
                onChange={evento => setDataReceber(evento.target.value)}
                label="Recebimento"
                type="datetime-local"
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