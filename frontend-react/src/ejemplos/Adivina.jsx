import { useState } from "react"

function Adivina() {

    const [eleccion, setEleccion] = useState("") // guarda lo que ingresa el usuario
    const [resultado, setResultado] = useState("") // guarda el mensaje que queremos mostrar

    function sortear() {
        const ganador = Math.floor(Math.random() * 10) + 1 // produce un n° entre 1 y 10
        const elegido = Number(eleccion)

        
        if (eleccion === "") {
            setResultado("Ingresá un número")
            return
        }
        if (eleccion < 1 || eleccion > 10){
            setResultado("Ingresa un número entre 1 y 10")
            return
        }

        if (elegido === ganador) {
            setResultado(`Ganaste. Salió ${ganador} y elegiste ${elegido}`)
        } else {
            setResultado(`Perdiste. Salió ${ganador} y elegiste ${elegido}`)
        }
    }

    return (
        <>
            <h2>Adiviná el número</h2>

            <input
                type="number"
                value={eleccion}
                onChange={(e) => setEleccion(e.target.value)}
            />

            <button onClick={sortear}>
                Adivinar
            </button>

            <p>{resultado}</p>
        </>
    )
}

export default Adivina