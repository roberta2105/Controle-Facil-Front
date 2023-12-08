import React, { useState, useContext } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Controle from "../../assets/Controle.png";
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert

} from '@mui/material';



const Login = () => {

  const { handleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha
  const [loginError, setLoginError] = useState(false);
  const [loginSucess, setLoginSucess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página

    try {
      
      // Chame a função de autenticação com os dados do formulário
      await handleLogin({ email, senha });

        setLoginSucess(true);
        setTimeout(() => {
          setLoginSucess(false);
        }, 1500); // Tempo em milissegundos
        navigate('/naturezasdelancamento');


    } catch (error) {
      setLoginError(true);
      setTimeout(() => {
        setLoginError(false);
      }, 1500); // Tempo em milissegundos

    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="imagem-container">
        <img src={Controle} alt="Controle-Fácil banner vertical" />
      </div>
      <div className="form-container">
        <Container>

        
       {loginSucess && (
        <Alert variant="filled" severity="success">
          Login realizado com sucesso!
        </Alert>
      )} 

        {loginError && (
        <Alert variant="filled" severity="error" data-test="mensagem-erro">
          O email digitado é inválido
        </Alert>
      )}

     

          <form className='container p-5 my-5 border formulario' onSubmit={handleSubmit}>
            <Typography className='titulo' component="h1" variant="h3">
              Login
            </Typography>
            <TextField 
              data-test="email-input"
              variant="outlined"
              margin="normal"
              type="email"
              placeholder="Email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <FormControl 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              data-test="senha-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            >
              <InputLabel>Senha</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button data-test="botao-enviar"
             sx={{
              backgroundColor: '#028971',
              '&:hover': {
                backgroundColor: '#028971e0',
              },
            }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Entrar
            </Button>
            <Link data-test='botao-cadastro' className="link-cadastro" to="/cadastro">
              Ainda não tem uma conta? Cadastre-se</Link>
          </form>
        </Container>
      </div>
    </div >
  );
}

export default Login;