import { useState } from "react"

function CambiarTitulo() {
    const [titulo, setTitulo] = useState("Inicio")

    return (
        <>
            <h1>{titulo}</h1>
            <div style={{display: "flex", gap: "5px", justifyContent: "center"}}>
            <button onClick={() => setTitulo("Alumnos")} style={{fontSize: "20px"}}>
                Alumnos
            </button>
            <button onClick={() => setTitulo("Docentes")} style={{fontSize: "20px"}}>
                Docentes
            </button>
            </div>
        </>
    )
}

export default CambiarTitulo
