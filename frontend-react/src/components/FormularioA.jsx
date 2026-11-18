import { useState } from "react";
import { Button, Paper, TextField, Alert } from "@mui/material";
import "../styles/formulario.css";
import { useAuth } from "../context/useAuth";
import API_URL from "../config/api"
const API_ALUMNOS = `${API_URL}/alumnos`

function FormularioA({ onAlumnoCreado, alumnoEditar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    legajo: String(alumnoEditar?.legajo ?? ""),
    nombre: alumnoEditar?.nombre ?? "",
    carrera: alumnoEditar?.carrera ?? "",
    correo: alumnoEditar?.correo ?? "",
  });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const { token } = useAuth()

  function manejarCambio(e) {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  async function guardar(e) {
    e.preventDefault();
    setError("");
    setGuardando(true);

    const alumno = {
      ...formulario,
      legajo: Number(formulario.legajo),
    };
    const editando = Boolean(alumnoEditar);

    const url = editando
      ? `${API_ALUMNOS}/${alumnoEditar.legajo}`
      : API_ALUMNOS;

    try {
      const respuesta = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, 
        body: JSON.stringify(alumno),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || `Error http: ${respuesta.status}`);
      }

      setFormulario({ legajo: "", nombre: "", carrera: "", correo: "" });
      onAlumnoCreado();
    } catch (error) {
      console.error("Error al guardar: ", error);
      setError(error.message || "No se pudo conectar con el servidor");
    } finally {
      setGuardando(false);
    }
  }

  function cancelar() {
    onCancelar();
  }
  return (
    <>
      <Paper component="section" elevation={2} className="formulario-card">
        <h2>{alumnoEditar ? "Editar alumno" : "Nuevo alumno"}</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={guardar}>
          <div className="formulario-grid">
            <TextField
              label="Legajo"
              id="legajo"
              name="legajo"
              fullWidth
              variant="standard"
              value={formulario.legajo}
              onChange={manejarCambio}
              disabled={Boolean(alumnoEditar)}
              required
            />{" "}
            <br />
            {/* <label htmlFor="nombre">Nombre: </label> */}
            <TextField
              id="nombre"
              label="Nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              variant="standard"
              fullWidth
              required
            />{" "}
            <br />
            {/* <label htmlFor="carrera">Carrera: </label> */}
            <TextField
              label="Carrera"
              id="carrera"
              name="carrera"
              value={formulario.carrera}
              onChange={manejarCambio}
              variant="standard"
              fullWidth
              required
            />{" "}
            <br />
            {/* <label htmlFor="correo">Correo: </label> */}
            <TextField
              label="Correo"
              id="correo"
              name="correo"
              value={formulario.correo}
              onChange={manejarCambio}
              fullWidth
              variant="standard"
              required
            />
          </div>
          <div className="formulario-acciones">
            <Button type="submit" disabled={guardando} variant="outlined">
              {guardando
                ? "Guardando..."
                : alumnoEditar
                  ? "Guardar cambios"
                  : "Guardar"}
            </Button>
            {alumnoEditar && (
              <Button type="button" onClick={cancelar} disabled={guardando}>
                Cancelar
              </Button>
            )}
          </div>
          {error && <p role="alert">{error}</p>}
        </form>
      </Paper>
    </>
  );
}
export default FormularioA;
