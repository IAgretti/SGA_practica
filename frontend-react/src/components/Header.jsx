import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Link } from "react-router-dom";
import SelectorTema from "./SelectorTema"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/useAuth";

export default function Header() {
    const navigate = useNavigate()
    const { cerrarSesion } = useAuth()

    const logout = () => {
        cerrarSesion()
        navigate("/login")
    }
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ borderBottom: 1, borderColor: "divider" }}
        >
            <Toolbar sx={{ minHeight: { xs: 68, sm: 76 }, px: 0 }}>
                <Box className="layout-container header-content">
                    <Box className="header-brand">
                        <Box
                            aria-hidden="true"
                            sx={{
                                display: "grid",
                                placeItems: "center",
                                width: 42,
                                height: 42,
                                flexShrink: 0,
                                borderRadius: 2,
                                bgcolor: "rgba(255, 255, 255, 0.16)",
                            }}
                        >
                            <SchoolRoundedIcon sx={{ fontSize: 27 }} />
                        </Box>
                        <Box>
                            <Typography component="h1" variant="h5" fontWeight={700} lineHeight={1.1}>
                                SGA
                            </Typography>
                            <Typography
                                variant="body2"
                                className="header-subtitle"
                                sx={{ opacity: 0.82 }}
                            >
                                Sistema de Gestión Académica
                            </Typography>
                        </Box>
                    </Box>
                    <Box component="nav" aria-label="Navegación principal" className="header-navigation">
                        <Button
                            component={Link}
                            to="/"
                            color="inherit"
                            sx={{ minWidth: "auto", px: { xs: 1.25, sm: 2 }, textTransform: "none", fontWeight: 600 }}
                        >
                            Inicio
                        </Button>
                        <Button
                            component={Link}
                            to="/alumnos"
                            color="inherit"
                            sx={{ minWidth: "auto", px: { xs: 1.25, sm: 2 }, textTransform: "none", fontWeight: 600 }}
                        >
                            Alumnos
                        </Button>
                        <Button
                            component={Link}
                            to="/docentes"
                            color="inherit"
                            sx={{ minWidth: "auto", px: { xs: 1.25, sm: 2 }, textTransform: "none", fontWeight: 600 }}
                        >
                            Docentes
                        </Button>
                        <Button
                            type="button"
                            color="inherit"
                            variant="outlined"
                            onClick={logout}
                            sx={{ textTransform: "none", fontWeight: 600 }}
                        >
                            Cerrar sesión
                        </Button>
                        <Box className="header-theme-selector">
                            <SelectorTema />
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}