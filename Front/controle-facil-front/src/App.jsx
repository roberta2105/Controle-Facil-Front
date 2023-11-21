import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Rota} from "./router/router";

import { AuthProvider } from "./context/auth";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                    <Rota />
            </AuthProvider>
        </BrowserRouter>


    )

}

export default App
