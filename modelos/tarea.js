import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";

export const crearTarea = (id, titulo, descripcion) => {
    if (!titulo || titulo.trim() === "") {
        return null;
    }

    const ahora = new Date();

    return {
        id,
        titulo: titulo.trim(),
        descripcion,
        estado: ESTADOS.PENDIENTE,
        fechaCreacion: ahora,
        fechaModificacion: ahora,
        vencimiento: null,
        dificultad: DIFICULTADES.UNA_ESTRELLA,
    };
};
