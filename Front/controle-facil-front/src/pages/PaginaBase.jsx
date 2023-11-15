import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper } from "@mui/material"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link as RouterLink } from 'react-router-dom'


const PaginaBase = () => {

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Controle Fácil
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 3 , columnGap: '30px', marginLeft: '50px'}}>
                            <Link component={RouterLink} to="/Tarefa">
                                <Button sx={{ my: 1, color: 'white', backgroundColor: '#9400D3' }}>
                                    Lançamentos 
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/Tarefa/novo">
                                <Button sx={{ my: 1, color: 'white', backgroundColor: '#9400D3' }}>
                                    Novo Lançamento
                                </Button>
                            </Link>
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