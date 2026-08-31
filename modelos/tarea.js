import { DIFICULTADES, ESTADOS } from "../constantes/tarea.js";

export const crearTarea = (titulo, descripcion) => {
    if (!titulo) {
        console.log("El titulo es obligatorio");
        return null;
    }

    return {
        titulo,
        descripcion,
        estado: ESTADOS.PENDIENTE,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
        vencimiento: null,
        dificultad: DIFICULTADES.UNA_ESTRELLA,
    };
};