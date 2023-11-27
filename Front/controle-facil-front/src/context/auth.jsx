import React, { useState, createContext, useEffect } from "react";
import http from "../http/http";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //Verifica se existe um token no armazenamento local
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            http.defaults.headers = {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            };
            setAuthenticated(true); // Definir como autenticado ao encontrar um token
        } else {
        
            setAuthenticated(false); // Definir como não autenticado se não houver token
        }

        setLoading(false);
    }, []);

    async function handleLogin({ email, senha }) {
        try {
            const response = await http.post('/usuarios/login', { email, senha });
            const { token } = response.data;

            localStorage.setItem('token', token);
            http.defaults.headers.Authorization = `Bearer ${token}`;
            setAuthenticated(true);

            navigate('/naturezasdelancamento');

        } catch (error) {
            console.error('Erro no login:', error);
            throw new Error('Erro ao autenticar usuário');
        }
    }

    function handleLogout() {
        setAuthenticated(false);
        localStorage.removeItem('token');
        delete http.defaults.headers.Authorization;
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

