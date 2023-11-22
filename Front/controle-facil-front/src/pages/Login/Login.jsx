import React, { useState, useContext } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Controle from "../../assets/Controle.png";
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';

import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';


const Login = () => {

  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
      // Chame a função de autenticação com os dados do formulário
      await handleLogin({ email, senha });

      alert('Login realizado com sucesso!')
      
    } catch (error) {
      alert('Email ou seja incorretos!')

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
            <Button sx={{backgroundColor: '#028971',
            '&:hover': {
              backgroundColor: '#028971e0',
          },}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
            <Link className="link-cadastro" to="/cadastro">
              Ainda não tem uma conta? Cadastre-se</Link>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Login;