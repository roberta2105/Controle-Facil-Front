import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios';


const FormularioTarefas = () => {

    const [nomeTarefa, setNomeTarefa] = useState('')
    const [descricao, setDescricao] = useState('')
    const [status, setStatus] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get(`https://654eaeda358230d8f0ccc8a2.mockapi.io/Tarefa/${parametros.id}/`)
                .then(resposta => {
                    setNomeTarefa(resposta.data.Titulo),
                        setDescricao(resposta.data.Descricao),
                        setStatus(resposta.data.Status)
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
            axios.put(`https://654eaeda358230d8f0ccc8a2.mockapi.io/Tarefa/${parametros.id}/`, {
                Titulo: nomeTarefa,
                Descricao: descricao,
                Status: status
            })
                .then(() => {
                    alert("Tarefa atualizada com sucesso!")
                })
        } else {
            axios.post('https://654eaeda358230d8f0ccc8a2.mockapi.io/Tarefa/', {
                Titulo: nomeTarefa,
                Descricao: descricao,
                Status: status
            })
                .then(() => {
                    alert("Tarefa cadastrada com sucesso!")
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
                    label="Nome da Tarefa"
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
                    value={status}
                    onChange={evento => setStatus(evento.target.value)}
                    label="Status"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Enviar</Button>
            </Box>
        </Box>
    )



}

export default FormularioTarefas