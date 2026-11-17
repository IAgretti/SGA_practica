import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter} from "react-router-dom";
import AuthProvider from "./context/AuthProvider";


import tema from "./tema";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
        <ThemeProvider theme={tema} defaultMode="system">
            <CssBaseline />
            <AuthProvider> 
            <App />
            </AuthProvider>
        </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);