import { AlertTitle, Alert, Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import http from "../../http/http"


const FormularioTarefas = () => {

    const [nomeTarefa, setNomeTarefa] = useState('')
    const [descricao, setDescricao] = useState('')

    const navigate = useNavigate(); 
    const parametros = useParams()
    const [Sucess, setSucess] = useState(false);
    const [SucessCriar, setSucessCriar] = useState(false);


    useEffect(() => {
        if (parametros.id) {
            http.get(`naturezasdelancamento/${parametros.id}/`)
                .then(resposta => {
                    setNomeTarefa(resposta.data.descricao),
                        setDescricao(resposta.data.observacao)
                })

                .catch(error => console.error('Erro ao buscar tarefa:', error));
        }
    }, [parametros])

    const SubmeterForm = (evento) => {
        evento.preventDefault()

        // const formData = new FormData();

        // formData.append('Titulo', nomeTarefa)
        // formData.append('Descricao', descricao)
        // formData.append('Status', status)


        if (parametros.id) {
            http.put(`naturezasdelancamento/${parametros.id}/`, {
                descricao: nomeTarefa,
                observacao: descricao,
            })
                .then(() => {
                    setSucess(true);
                    setTimeout(() => {
                        setSucess(false);
                        navigate('/naturezasdelancamento');
                    }, 1500); // Tempo em milissegundos

                    
                })
        } else {

            http.post('naturezasdelancamento', {
                descricao: nomeTarefa,
                observacao: descricao,
            })
                .then(() => {
                    setSucessCriar(true);
                    setTimeout(() => {
                        setSucessCriar(false);
                    }, 1500); // Tempo em milissegundos
                    navigate('/naturezasdelancamento');
                })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
            <Typography sx={{ padding: 3 }} component="h1" variant="h6">Formulário de Lançamentos</Typography>
            <Box component="form" sx={{ width: '80%', height: '300px' }} onSubmit={SubmeterForm}>

            {Sucess && (
                    <Alert variant="filled" severity="success">
                        <AlertTitle>Sucesso</AlertTitle>
                        Lançamento atualizado com sucesso!
                    </Alert>
                )}
                {SucessCriar && (
                    <Alert variant="filled" severity="success">
                        <AlertTitle>Sucesso</AlertTitle>
                        Lançamento criado com sucesso!
                    </Alert>
                )}
               
                <TextField
                    value={nomeTarefa}
                    onChange={evento => setNomeTarefa(evento.target.value)}
                    label="Nome do lançamento"
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
                <Button sx={{ marginTop: 1 }}
                    type="submit"
                    variant="outlined"
                    fullWidth>Enviar</Button>
            </Box>
        </Box>
    )



}

export default FormularioTarefas