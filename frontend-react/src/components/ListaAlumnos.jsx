import { useEffect, useState } from "react"
import { useAuth } from "../context/useAuth"
import API_URL from "../config/api"
const API_ALUMNOS = `${API_URL}/alumnos`

function ListaAlumnos({ actualizar, onAlumnoCreado, onEditarAlumno }){
    const [alumnos, setAlumnos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const { token, usuario } = useAuth()
    
    useEffect(() => {
        async function cargarAlumnos() {
            setCargando(true)
            setError("")

            try {
            if (!token) {
                throw new Error("No se encontró token de autenticación. Por favor, inicia sesión.")
            }
            const respuesta = await fetch(API_ALUMNOS, { // Se agrega el token JWT en el encabezado de autorización para acceder a la ruta protegida
                headers: {
                    "Authorization": `Bearer ${token}` 
                }
            })
            if (!respuesta.ok) {
                throw new Error(`Error en la respuesta de la API: ${respuesta.status}`)
            }
            const datos = await respuesta.json()
            setAlumnos(datos) // Actualizamos el estado con la lista de alumnos obtenida de la API
        } catch (error) {
            console.error("Fallo al cargar alumnos:", error)
            setError("No se pudo cargar la lista de alumnos")
        } finally {
            setCargando(false)
        }
    }
        cargarAlumnos()
    }, [actualizar, token])

    if (cargando) {
        return <p>Cargando alumnos...</p>
    }
    if (error) {
        return <p role="alert">{error}</p>
    }

    async function eliminarAlumno(legajo){
        const confirmar = window.confirm("¿Seguro que querés eliminar este alumno?")

        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onAlumnoCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo eliminar el alumno.")
        }
    }
    return (
    <section>
    <h2>Alumnos</h2>
    {alumnos.length === 0 
    ? (<p>No hay alumnos registrados</p>)
    : (<ul style={{listStyle:"none"}}>
         {alumnos.map(alumno => ( 
        <li key={alumno.legajo}> 
            {alumno.legajo} - {alumno.nombre} <br />
            {usuario?.rol === "admin" && (
            <button type="button"
            onClick={() => onEditarAlumno(alumno)}>
                Editar
            </button>
            )}
            {usuario?.rol === "admin" && (
            <button type="button"
            onClick={() => eliminarAlumno(alumno.legajo)}>
                Eliminar
            </button>
            )}
        </li>))}
    </ul>)}
    </section>
    )
}

export default ListaAlumnos