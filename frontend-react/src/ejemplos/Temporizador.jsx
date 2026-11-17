import { useEffect, useState } from "react";

function Temporizador() {
    const [segundos, setSegundos] = useState(0)

    useEffect(() => {
        const intervalo = setInterval(() => {
            setSegundos(segundos => segundos + 1)
        }, 1000)
        return () => {
            clearInterval(intervalo)
        }
    }, [])
  return (
    <h2>Tiempo: {segundos} segundos</h2>
  )
}
export default Temporizador