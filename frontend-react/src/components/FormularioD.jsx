import { useState } from "react";
import API_URL from "../config/api";
const API_DOCENTES = `${API_URL}/docentes`
import { Button, Paper, TextField, Alert } from "@mui/material";
import "../styles/formulario.css";

function FormularioD({ onDocenteCreado, docenteEditar, onCancelar }) {
  const [formulario, setFormulario] = useState({
    dni: String(docenteEditar?.dni ?? ""),
    nombre: docenteEditar?.nombre ?? "",
    especialidad: docenteEditar?.especialidad ?? "",
    correo: docenteEditar?.correo ?? "",
  });
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

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

    const docente = {
      ...formulario,
      dni: Number(formulario.dni),
    };
    const editando = Boolean(docenteEditar);

    const url = editando
      ? `${API_DOCENTES}/${docenteEditar.dni}`
      : API_DOCENTES;

    try {
      const respuesta = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docente),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.mensaje || `Error http: ${respuesta.status}`);
      }

      setFormulario({ dni: "", nombre: "", especialidad: "", correo: "" });
      onDocenteCreado();
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
      <Paper component="section" elevation={2} className="formulario-card">
        <h2>{docenteEditar ? "Editar docente" : "Nuevo docente"}</h2>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={guardar}>
          <div className="formulario-grid">
            <TextField
              label="DNI"
              id="dni"
              name="dni"
              fullWidth
              variant="standard"
              value={formulario.dni}
              onChange={manejarCambio}
              disabled={Boolean(docenteEditar)}
              required
            />{" "}
            <br />
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
            <TextField
              label="Especialidad"
              id="especialidad"
              name="especialidad"
              value={formulario.especialidad}
              onChange={manejarCambio}
              variant="standard"
              fullWidth
              required
            />{" "}
            <br />
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
                : docenteEditar
                  ? "Guardar cambios"
                  : "Guardar"}
            </Button>
            {docenteEditar && (
              <Button type="button" onClick={cancelar} disabled={guardando}>
                Cancelar
              </Button>
            )}
          </div>
          {error && <p role="alert">{error}</p>}
        </form>
      </Paper>
  );
}
export default FormularioD;