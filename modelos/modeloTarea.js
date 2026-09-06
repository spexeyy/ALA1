import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";

export const crearTarea = (id, titulo, descripcion = "") => {
  const ahora = new Date();

  return {
    id,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: ESTADOS.PENDIENTE,
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    vencimiento: null,
    dificultad: DIFICULTADES.FACIL,
  };
};
