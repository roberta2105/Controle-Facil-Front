import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import http from "../../http/http"


const FormularioTarefas = () => {

    const [nomeTarefa, setNomeTarefa] = useState('')
    const [descricao, setDescricao] = useState('')

    const navigate = useNavigate(); // Hook de navegação
    const parametros = useParams()

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
                    alert("Tarefa atualizada com sucesso!")
                })
        } else {
            http.post('naturezasdelancamento', {
                descricao: nomeTarefa,
                observacao: descricao,
            })
                .then(() => {
                    alert("Tarefa cadastrada com sucesso!")
                    navigate('/naturezasdelancamento');
                })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
            <Typography sx={{ padding: 3 }} component="h1" variant="h6">Formulário de Lançamentos</Typography>
            <Box component="form" sx={{ width: '80%', height: '300px' }} onSubmit={SubmeterForm}>
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