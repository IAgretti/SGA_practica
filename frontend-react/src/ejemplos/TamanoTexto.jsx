import { useState } from "react";

function TamanoTexto() {
    const [tamano, setTamano] = useState("20px")

    return (
        <>
        <p style={{fontSize: tamano }}>Bienvenidos a Programación IV</p>
        <div style={{display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px"}}>
        <button onClick={() => {setTamano("14px")}}>Pequeño</button>
        <button onClick={() => {setTamano("20px")}}>Mediano</button>
        <button onClick={() => {setTamano("24px")}}>Grande</button>
        </div>
        </>
    )
}
export default TamanoTexto