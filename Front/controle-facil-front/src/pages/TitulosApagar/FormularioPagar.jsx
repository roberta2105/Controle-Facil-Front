import { AlertTitle, Alert, Box, Button, TextField, Typography, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import http from "../../http/http"


const FormularioPagar = () => {

    const [lancamento, setLancamento] = useState('')
    const [lancamentoOptions, setLancamentoOptions] = useState([]);
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valorOriginal, setValorOriginal] = useState('')
    const [valorPago, setValorPago] = useState('')
    const [dataReferencia, setDataReferencia] = useState('')
    const [dataVencimento, setDataVencimento] = useState('')
    const [dataPagamento, setDataPagamento] = useState('')
    const [Sucess, setSucess] = useState(false);
    const [SucessCriar, setSucessCriar] = useState(false);

    const navigate = useNavigate(); // Hook de navegação
    const parametros = useParams()
 


    useEffect(() => {
        if (parametros.id) {
            http.get(`/apagar/${parametros.id}/`)
                .then(resposta => {
                    setLancamento(resposta.data.idNaturezaDeLancamento),
                        setNome(resposta.data.descricao),
                        setDescricao(resposta.data.observacao),
                        setValorOriginal(resposta.data.valorOriginal),
                        setValorPago(resposta.data.valorPago),
                        setDataReferencia(resposta.data.dataReferencia),
                        setDataVencimento(resposta.data.dataVencimento),
                        setDataPagamento(resposta.data.dataPagamento)
                })

                .catch(error => console.error('Erro ao buscar pagamento:', error));
        }
    }, [parametros])

    useEffect(() => {
        http.get('naturezasdelancamento')
            .then(resposta => {
                setLancamentoOptions(resposta.data);
            })
            .catch(error => console.error('Erro ao buscar pagamento:', error));
    }, []);

    const SubmeterForm = (evento) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`/apagar/${parametros.id}/`, {
                idNaturezaDeLancamento: lancamento,
                descricao: nome,
                observacao: descricao,
                valorOriginal: valorOriginal,
                valorPago: valorPago,
                dataReferencia: dataReferencia,
                dataVencimento: dataVencimento,
                dataPagamento: dataPagamento
            })
                .then(() => {
                    setSucess(true);
                    setTimeout(() => {
                        setSucess(false);
                        navigate('/naturezasdelancamento');
                    }, 1500); // Tempo em milissegundos
                })
                .catch(error => console.error('Erro ao na atualização do pagamento:', error));

        } else {

            http.post('/apagar', {
                idNaturezaDeLancamento: lancamento,
                descricao: nome,
                observacao: descricao,
                valorOriginal: valorOriginal,
                valorPago: valorPago,
                dataReferencia: dataReferencia,
                dataVencimento: dataVencimento,
                dataPagamento: dataPagamento
            })
                .then(() => {
                    setTimeout(() => {
                        setSucessCriar(true);
                        setSucessCriar(false);
                        navigate('/naturezasdelancamento');
                    }, 1500); // Tempo em milissegundos
                    
                })
                .catch(error => console.error('Erro ao na cadastro do pagamento:', error));

        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>

            <Typography sx={{ marginTop: '6%' }} component="h1" variant="h6">Formulário de Pagamentos</Typography>

            <Box component="form" sx={{ padding: '50px' }} onSubmit={SubmeterForm}>
            {Sucess && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Sucesso</AlertTitle>
                    Pagamento atualizado com sucesso!
                </Alert>
            )}
            {SucessCriar && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Sucesso</AlertTitle>
                    Pagamento criado com sucesso!
                </Alert>
            )}
            
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
                    label="Pagamento"
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
                    value={valorPago}
                    onChange={evento => setValorPago(evento.target.value)}
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
                    value={dataPagamento}
                    onChange={evento => setDataPagamento(evento.target.value)}
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

export default FormularioPagar