import { obtenerTareas } from "../servicios/servicioTarea.js";
import { ERRORES } from "../constantes/errores.js";

const mostrarDificultad = (dificultad) => {
  return "★".repeat(dificultad);
};

const formatearFecha = (fecha) => {
  return fecha.toLocaleString("es-AR", { hour12: false });
};

export const mostrarTarea = (tarea) => {
  console.log(`
ID: ${tarea.id}
Titulo: ${tarea.titulo}
Descripción: ${tarea.descripcion}
Estado: ${tarea.estado}
Dificultad: ${mostrarDificultad(tarea.dificultad)}
Creada: ${formatearFecha(tarea.fechaCreacion)}
Modificada: ${formatearFecha(tarea.fechaModificacion)}
Vencimiento: ${tarea.vencimiento ? formatearFecha(tarea.vencimiento) : "Sin vencimiento"}`)
};

// Sin argumento muestra todas; con una lista muestra esa lista.
export const mostrarTareas = (tareas = obtenerTareas()) => {
  if (tareas.length === 0) {
    console.log(ERRORES.SIN_TAREAS);
    return;
  }

  for (const tarea of tareas) {
    mostrarTarea(tarea);
  }
};
