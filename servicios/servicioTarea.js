import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";
import { crearTarea } from "../modelos/tarea.js"

const tareas = [];

const actualizarFechaModificacion = (tarea) => {
    tarea.fechaModificacion = new Date();
};

export const agregarTarea = (titulo, descripcion) => {
    const tarea = crearTarea(titulo, descripcion);

    if (!tarea) {
        return null;
    }

    tareas.push(tarea);
    return tarea;
};

export const cambiarEstado = (tarea, nuevoEstado) => {
    if (!Object.values(ESTADOS).includes(nuevoEstado)) {
        console.log("Estado inválido");
        return;
    }

    tarea.estado = nuevoEstado;
    actualizarFechaModificacion(tarea);
};

export const cambiarDificultad = (tarea, nuevaDificultad) => {
    if (!Object.values(DIFICULTADES).includes(nuevaDificultad)) {
        console.log("Dificultad inválida");
        return;
    }

    tarea.dificultad = nuevaDificultad;
    actualizarFechaModificacion(tarea);
};

export const obtenerTareas = () => {
    return tareas;
};