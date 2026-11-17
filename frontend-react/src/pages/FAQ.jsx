// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import * as React from "react"
import Paper from "@mui/material/Paper"


// const preguntas = [
//   {
//     pregunta: "¿Cómo se registra un alumno?",
//     respuesta:
//       "Desde el formulario de Alumnos, completá el legajo, nombre, carrera y correo electrónico. Luego seleccioná Guardar.",
//   },
//   {
//     pregunta: "¿Cómo puedo modificar los datos de un alumno?",
//     respuesta:
//       "Buscá al alumno en el listado y seleccioná Editar. El formulario se completará con sus datos para que puedas modificarlos.",
//   },
//   {
//     pregunta: "¿Puedo eliminar un alumno?",
//     respuesta:
//       "Sí. Desde el listado, seleccioná Eliminar. Antes de confirmar, verificá que estés trabajando con el alumno correcto.",
//   },
//   {
//     pregunta: "¿Qué hago si aparece un error al guardar?",
//     respuesta:
//       "Revisá los campos y verificá que el servidor esté funcionando. Si el problema continúa, consultá el mensaje de error.",
//   },
// ];
function FAQ() {
    const id = React.useId();
  return (
    <div>
    <Paper elevation={2}
    sx={{
      p: 3,
      border: 2,
      borderColor: "divider",
      borderRadius: 3,
    }}>
      <Typography variant="h5" xs={{ mb: 1 }}>
        Preguntas Frecuentes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Ayuda para utilizar el Sistema de Gestión Académica
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
          >
          <Typography component="span">¿Cómo se registra un alumno?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Desde el formulario de Alumnos, completá el legajo, nombre, carrera y correo electrónico. Luego seleccioná Guardar.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel2-content`}
          id={`${id}-panel2-header`}
          >
          <Typography component="span">¿Cómo puedo modificar los datos de un alumno?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Sí. Desde el listado, seleccioná Eliminar. Antes de confirmar, verificá que estés trabajando con el alumno correcto.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls={`${id}-panel1-content`}
          id={`${id}-panel1-header`}
          >
          <Typography component="span">¿Puedo eliminar un alumno?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Desde el formulario de Alumnos, completá el legajo, nombre, carrera y correo electrónico. Luego seleccioná Guardar.
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Paper>
    </div>
//   return (
    // <Paper
    //   elevation={0}
    //   sx={{
    //     p: { xs: 2, sm: 3 },
    //     border: 1,
    //     borderColor: "divider",
    //     borderRadius: 3,
    //   }}
    // >
    //   <Typography variant="h5" sx={{ mb: 1 }}>
    //     Preguntas frecuentes
    //   </Typography>

    //   <Typography
    //     variant="body2"
    //     color="text.secondary"
    //     sx={{ mb: 2 }}
    //   >
    //     Ayuda para utilizar el Sistema de Gestión Académica.
    //   </Typography>

    //   {preguntas.map((item, indice) => (
    //     <Accordion
    //       key={indice}
    //       disableGutters
    //       elevation={0}
    //       sx={{
    //         borderBottom: 1,
    //         borderColor: "divider",
    //         "&:before": { display: "none" },
    //       }}
    //     >
    //       <AccordionSummary
    //         expandIcon={<ExpandMoreIcon />}
    //         aria-controls={`respuesta-${indice}`}
    //         id={`pregunta-${indice}`}
    //       >
    //         <Typography fontWeight={500}>
    //           {item.pregunta}
    //         </Typography>
    //       </AccordionSummary>

    //       <AccordionDetails id={`respuesta-${indice}`}>
    //         <Typography color="text.secondary">
    //           {item.respuesta}
    //         </Typography>
    //       </AccordionDetails>
    //     </Accordion>
    //   ))}
    // </Paper>

  );
}
export default FAQ;