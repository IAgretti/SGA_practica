import ListaDocentes from "../components/ListaDocentes"
import FormularioD from "../components/FormularioD"
import { useState } from "react"

export default function Docentes() {
  const [actualizar, setActualizar] = useState(0)
  const [docenteEditar, setDocenteEditar] = useState(null)

  function docenteCreado(){
    setActualizar(valor => valor + 1)
    setDocenteEditar(null)
  }
  
  function seleccionarDocente(alumno) {
    setDocenteEditar(alumno)
  }
 
    return (
        <main>
            <h1>Gestión de Docentes</h1>
     
      <FormularioD
      key={docenteEditar?.dni ?? "nuevo"} 
      onDocenteCreado={docenteCreado}
      alumnoEditar={docenteEditar}
      onCancelar={() => setDocenteEditar(null)}
      />
      <ListaDocentes 
      actualizar={actualizar} 
      onDocenteCreado={docenteCreado}
      onEditarDocente={seleccionarDocente}
      />

    </main>
    )
}