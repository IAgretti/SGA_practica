import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate() // Hook de React Router para redirigir a otra ruta después del login
    const {setToken, usuario, setUsuario} = useAuth()
    const theme = useTheme();
    // usuario autenticado
    // const [usuario, setUsuario] = useState(null);
    // Estados para mensajes y carga
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("")
    // datos del formulario
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    
    async function login(event) {
        event.preventDefault();
        setError(""); // Limpiar el mensaje de error al iniciar un nuevo intento de login
        setCargando(true) // Indicar que la carga ha comenzado
        setMensaje("") // Limpiar el mensaje de éxito al iniciar un nuevo intento de login

    try {
        const respuesta = await fetch("http://localhost:3000/auth/login", {
            method: "POST",  // se utiliza POST para enviar datos al servidor
            headers: {"Content-Type":"application/json"}, // se indica que el cuerpo de la solicitud es JSON
            body: JSON.stringify({ email, password }) // se envían los datos del formulario como JSON en el cuerpo de la solicitud
        })
        const datos = await respuesta.json()
        if (!respuesta.ok) {
            throw new Error(datos.mensaje || "No se pudo iniciar sesión")
        }
        // Confirmar el éxito. El JWT se agregará en el paso siguiente
        localStorage.setItem("token", datos.token) // Guardar el token JWT en el almacenamiento local para mantener la sesión del usuario
        localStorage.setItem("usuario", datos.usuario)

        setToken(datos.token) // Actualizar el estado del token en el contexto de autenticación para que otros componentes puedan acceder a él
        setUsuario(datos.usuario)
        
        // Limpiar los campos
        setEmail("")
        setPassword("")

        setMensaje(datos.mensaje)
        navigate("/") // Redirigir al usuario a la página principal después de un inicio de sesión exitoso

    } catch (error) {
        console.error("Error en login: ", error)
        setError(error.message || "No se pudo conectar con el servidor.")
    } finally {
        setCargando(false) // indicar que la carga ha terminado, independientemente del resultado
    }
}
    return (
       <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Box // Contenedor del formulario
                component="form"
                onSubmit={login} // se llama a la función login cuando se envía el formulario
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: `0 12px 32px ${theme.palette.divider}`,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        mb: 3,
                        textAlign: "center",
                        color: theme.palette.text.primary,
                        fontWeight: 700,
                    }}
                >
                    Iniciar sesión
                </Typography>

                <TextField
                    label="Correo electrónico"
                    type="email"
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)} // actualiza el estado del email cuando el usuario escribe en el campo
                    autoComplete="username" // ayuda a los navegadores a autocompletar el campo con el nombre de usuario (correo electrónico)
                    required
                    fullWidth
                    margin="normal"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                        },
                    }}
                />

                <TextField
                    type="password"
                    label="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    fullWidth
                    margin="normal"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                        },
                    }}
                />

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {mensaje && ( // Mostrar mensaje de éxito si existe
                    <Alert
                        severity="success" // Cambié el severity a "success" para indicar que es un mensaje positivo
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        {mensaje}
                    </Alert>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cargando} // deshabilitar el botón mientras se está cargando la solicitud
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                    }}
                >
                    {cargando ? "Ingresando..." : "Ingresar"}
                </Button>

                {usuario && (
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle1">
                            Bienvenido/a, {usuario.nombre}
                        </Typography>

                        <Typography variant="body2">
                            Correo: {usuario.email}
                        </Typography>

                        <Typography variant="body2">
                            Rol: {usuario.rol}
                        </Typography>
                    </Box>
                )}

            </Box>
        </Box>
    );
}