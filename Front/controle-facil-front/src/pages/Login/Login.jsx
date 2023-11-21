import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../../http/http";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Controle from "../../assets/Controle.png";

import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate(); // Hook useNavigate para redirecionamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post('/usuarios/login', {
        email,
        senha,
      });

      const { token } = response.data;

      localStorage.setItem('token', token);

      // Redirecionamento após login bem-sucedido
      navigate('/naturezasdelancamento'); // Substitua '/outra-rota' pelo caminho desejado

    } catch (error) {
      console.error('Erro ao fazer o login: ', error);
    }
  };

  return (
    <div className="login-container">
      <div className="imagem-container">
        <img src={Controle} alt="Controle-Fácil banner vertical" />
      </div>
      <div className="form-container">
        <Container>
          <form className='container p-5 my-5 border formulario' onSubmit={handleSubmit}>
            <Typography className='titulo' component="h1" variant="h3">
              Login
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              type="text"
              placeholder="Email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              type="password"
              placeholder="Senha"
              required
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Login;