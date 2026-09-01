import { obtenerTareas, hayTareas } from "../servicios/servicioTarea.js";

const mostrarDificultad = (dificultad) => {
  return "★".repeat(dificultad);
};

export const mostrarTarea = (tarea) => {
  console.log(`
        Id: ${tarea.id}
        Titulo: ${tarea.titulo}
        Descripción: ${tarea.descripcion}
        Estado: ${tarea.estado}
        Dificultad: ${mostrarDificultad(tarea.dificultad)}
        Creada: ${tarea.fechaCreacion}
        Modificada: ${tarea.fechaModificacion}
        Vencimiento: ${tarea.vencimiento ? tarea.vencimiento : "Sin vencimiento"}`)
};


export const mostrarTareas = () => {
  if (!hayTareas()) {
    console.log("No hay tareas");
    return;
  }

  for (const tarea of obtenerTareas()) {
    mostrarTarea(tarea);
  }
};
