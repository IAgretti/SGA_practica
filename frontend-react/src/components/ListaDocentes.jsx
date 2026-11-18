import { useEffect, useState } from "react"
import API_URL from "../config/api"
const API_DOCENTES = `${API_URL}/docentes`

function ListaDocentes({ actualizar, onDocenteCreado, onEditarDocente }){
    const [docentes, setDocentes] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    
    useEffect(() => {
    
        async function cargarDocentes() {
            setCargando(true)
            setError("")

            try {
            const respuesta = await fetch(API_DOCENTES)
            if (!respuesta.ok) {
                throw new Error(`Error en la respuesta de la API: ${respuesta.status}`)
            }
            const datos = await respuesta.json()
            setDocentes(datos)
        } catch (error) {
            console.error("Fallo al cargar alumnos:", error)
            setError("No se pudo cargar la lista de docentes")
        } finally {
            setCargando(false)
        }
    }
        cargarDocentes()
    }, [actualizar])

    if (cargando) {
        return <p>Cargando docentes...</p>
    }
    if (error) {
        return <p role="alert">{error}</p>
    }

    async function eliminarDocente(dni){
        const confirmar = window.confirm("¿Seguro que querés eliminar este docente?")

        if (!confirmar) {
            return
        }
        try {
            const respuesta = await fetch(`${API_DOCENTES}/${dni}`, {
                method: "DELETE"
            })
            if (!respuesta.ok) {
                throw new Error(`No se pudo eliminar. Estado HTTP: ${respuesta.status}`)
            }
            onDocenteCreado()
        } catch (error) {
            console.error("Error al eliminar: ", error)
            alert(error.message || "No se pudo eliminar el alumno.")
        }
    }
    return (
    <section>
    <h2>Docentes</h2>
    {docentes.length === 0 
    ? (<p>No hay docentes registrados</p>)
    : (<ul style={{listStyle:"none"}}>
         {docentes.map(docente => ( 
        <li key={docente.legajo}> 
            {docente.legajo} - {docente.nombre} <br />
            <button type="button"
            onClick={() => onEditarDocente(docente)}>
                Editar
            </button>
            <button type="button"
            onClick={() => eliminarDocente(docente.legajo)}>
                Eliminar
            </button>
        </li>))}
    </ul>)}
    </section>
    )
}

export default ListaDocentes