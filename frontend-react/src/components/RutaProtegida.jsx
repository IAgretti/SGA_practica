import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/useAuth"

const RutaProtegida = () => {
    const {token, cargando } = useAuth() // Se obtiene el token y el estado de carga del contexto de autenticación

    if (cargando) {
        return <div>Verificando sesión...</div>
    }
    
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return <Outlet />
}

export default RutaProtegida