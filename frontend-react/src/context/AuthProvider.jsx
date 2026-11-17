import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {  // componente proveedor de autenticación
  const [token, setToken] = useState(() => localStorage.getItem("token")) 
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null)

  const cerrarSesion = () => { // función para cerrar sesión
    localStorage.removeItem("token");
    setToken(null)
  };

 useEffect(() => { // efecto para verificar la sesión al montar el componente
    const verificarSesion = async () => {
      const tokenGuardado = localStorage.getItem("token");

      if (!tokenGuardado) {
        setToken(null)
        setCargando(false);
        return;
      }
      try {
        const respuesta = await fetch(
          "http://localhost:3000/alumnos",
          {
            headers: {
              Authorization: `Bearer ${tokenGuardado}`
            }
          }
        );
        if (!respuesta.ok) {
          throw new Error("Sesión inválida");
        }
       setToken(tokenGuardado)
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        cerrarSesion();
      } finally {
        setCargando(false);
      }
    };
    verificarSesion();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        token,
        setToken,
        cerrarSesion,
        cargando
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider