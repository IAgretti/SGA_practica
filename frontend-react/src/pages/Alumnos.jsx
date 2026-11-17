import ListaAlumnos from "../components/ListaAlumnos"
import FormularioA from "../components/FormularioA"
import { useState } from "react"
import { useAuth } from "../context/useAuth"

export default function Alumnos() {
  const [actualizar, setActualizar] = useState(0)
  const [alumnoEditar, setAlumnoEditar] = useState(null)
  const { usuario } = useAuth() 

  function alumnoCreado(){
    setActualizar(valor => valor + 1)
    setAlumnoEditar(null)
  }
  
  function seleccionarAlumno(alumno) {
    setAlumnoEditar(alumno)
  }
 
    return (
        <main>
            <h1>Gestión de Alumnos</h1>
     {usuario?.rol === "admin" && (
      <FormularioA
      key={alumnoEditar?.legajo ?? "nuevo"} 
      onAlumnoCreado={alumnoCreado}
      alumnoEditar={alumnoEditar}
      onCancelar={() => setAlumnoEditar(null)}
      />
      )}
      <ListaAlumnos 
      actualizar={actualizar} 
      onAlumnoCreado={alumnoCreado}
      onEditarAlumno={seleccionarAlumno}
      />

    </main>
    )
}