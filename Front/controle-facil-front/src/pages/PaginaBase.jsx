import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper } from "@mui/material"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link as RouterLink } from 'react-router-dom'
import { AuthContext } from "../context/auth"
import React, { useContext } from 'react';


const PaginaBase = () => {

    const { handleLogout, authenticated } = useContext(AuthContext);

    const handleLogoutClick = () => {
        handleLogout();
        alert('Saída realizada com sucesso!');
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#028971' }}>
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Controle Fácil
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 3, columnGap: '30px', marginLeft: '50px' }}>
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
                            <Link component={RouterLink} to="/receber/novo">
                                <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}>
                                    Novo recebimento
                                </Button>
                            </Link>
                        </Box>
                        <Box>
                            {authenticated && (
                                <Button sx={{ my: 1, color: 'white', backgroundColor: '#2fae93db' }}
                                    variant="contained"
                                    onClick={handleLogoutClick}
                                >
                                    Sair
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>

        </>

    )
}

export default PaginaBase