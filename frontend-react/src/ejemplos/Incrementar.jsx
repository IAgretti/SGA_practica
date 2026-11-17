import { useState } from "react";

function Incrementar() {
    // let contador = 0
    const [contador, setContador] = useState(0)
    function incremento(){
       setContador(contador + 1)
    }
    function decremento(){
        if (contador > 0){
        setContador(contador - 1)
        }
    }
//   const [contador, setContador] = useState(0)
//   const [mostrar, setMostrar] = useState(false)

//   function incremento() {
//    setContador(contador + 1)
//   }

//   console.log("Render: ", contador)
  return (
    <>
    <h1>Contador: {contador}</h1>
    <div style={{display: "flex", justifyContent: "center", gap: "5px"}}>
    <button onClick={incremento} style={{width: "50px", height: "40px", fontSize: "20px" }}>+</button> <br />
    <button onClick={decremento} style={{width: "50px", height: "40px", fontSize: "20px"}}>-</button>
    </div>
    {/* <button onClick={() => setMostrar(!mostrar)}>Mostrar / Ocultar</button>
    {mostrar && <p>Hola, bienvenido!</p>} */}
   </>
  )
}
export default Incrementar