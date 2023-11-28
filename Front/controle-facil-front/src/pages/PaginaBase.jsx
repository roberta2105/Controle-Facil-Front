import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper, Grid } from "@mui/material"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link as RouterLink } from 'react-router-dom'
import { AuthContext } from "../context/auth"
import React, { useContext } from 'react';


const PaginaBase = () => {

    const { handleLogout, authenticated } = useContext(AuthContext);
    const userEmail = localStorage.getItem('email');

    const handleLogoutClick = () => {
        handleLogout();
    };

    return (
       <>
        <AppBar position="static" sx={{ backgroundColor: '#028971' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ mr: 4 }}>
                            Controle Fácil
                        </Typography>
                        {authenticated && (
                            <Typography sx={{ color: 'white' }}>
                                Bem-vindo(a), <br />{userEmail}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Link component={RouterLink} to="/naturezasdelancamento">
                            <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}>
                                Lançamentos
                            </Button>
                        </Link>
                        <Link component={RouterLink} to="/naturezasdelancamento/novo">
                            <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}>
                                Novo Lançamento
                            </Button>
                        </Link>
                        <Link component={RouterLink} to="areceber/novo">
                            <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}>
                                Novo recebimento
                            </Button>
                        </Link>
                        <Link component={RouterLink} to="apagar/novo">
                            <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}>
                                Novo pagamento
                            </Button>
                        </Link>
                        </Box>
                        {authenticated && (
                                <Button
                                    sx={{ color: 'white', backgroundColor: '#2fae93db' }}
                                    variant="contained"
                                    onClick={handleLogoutClick}
                                >
                                    Sair
                                </Button>
                            )}
                        
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ mt: 1 }}>
                <Container maxWidth="lg">
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    );
};

export default PaginaBase;