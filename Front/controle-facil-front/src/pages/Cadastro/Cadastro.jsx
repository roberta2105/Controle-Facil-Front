import React, { useState } from 'react';
import http from "../../http/http"
import { Alert, AlertTitle, Box, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [Sucess, setSucess] = useState(false);



    const SubmeterForm = (evento) => {
        evento.preventDefault();

        // Verifica se email e senha estão preenchidos antes de fazer a requisição
        if (email && senha) {
            http.post('/usuarios', {
                email: email,
                senha: senha
            })
                .then(() => {
                    setSucess(true);
                    setTimeout(() => {
                        setSucess(false);
                    }, 1500); // Tempo em milissegundos

                })
                .catch((error) => {
                    console.error('Erro ao cadastrar usuário: ', error);
                });
        } 
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", marginTop: "10%" }}>
            {Sucess && (
                <Alert variant="filled" severity="success">
                    <AlertTitle>Sucesso</AlertTitle>
                    Cadastro realizado com sucesso!
                </Alert>
            )}
        
            <Typography sx={{ padding: 2, color: '#028971' }} component="h1" variant="h4">Cadastro</Typography>
            <Box component="form" sx={{
                width: '50%',
                height: '300px',
                padding: '30px',
                mt: 1,
                p: 6,
                border: '1px solid #ccc',
                borderRadius: '5px'
            }} onSubmit={SubmeterForm}>
                <TextField
                    value={email}
                    onChange={evento => setEmail(evento.target.value)}
                    label="Digite o seu Email"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField
                    value={senha}
                    onChange={evento => setSenha(evento.target.value)}
                    label="Digite a sua Senha"
                    variant="standard"
                    fullWidth
                    required
                    margin="dense"
                />
                <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>Enviar</Button>
            </Box>
            <Button
                sx={{
                    backgroundColor: '#028971',
                    color: 'white',
                    marginTop: '2%',
                    '&:hover': {
                        backgroundColor: '#028971e0',
                    },
                }}
                variant="contained"
                component={Link}
                to="/"
            >
                Voltar
            </Button>
        </Box>
    )
}

export default Cadastro;
