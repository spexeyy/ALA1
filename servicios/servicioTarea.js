import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";
import { crearTarea } from "../modelos/tarea.js";

const tareas = [];
let siguienteId = 1;

const actualizarFechaModificacion = (tarea) => {
    tarea.fechaModificacion = new Date();
};

const esEstadoValido = (estado) => {
    return Object.values(ESTADOS).includes(estado);
};

const esDificultadValida = (dificultad) => {
    return Object.values(DIFICULTADES).includes(dificultad);
};

export const agregarTarea = (titulo, descripcion) => {
    const tarea = crearTarea(siguienteId, titulo, descripcion);

    if (!tarea) {
        return null;
    }

    siguienteId++;
    tareas.push(tarea);

    return tarea;
};

// TODO: cambiar estado y dificultad por id en vez de objeto

export const cambiarEstado = (tarea, nuevoEstado) => {
    if (!tarea || !esEstadoValido(nuevoEstado)) {
        return false;
    }

    tarea.estado = nuevoEstado;
    actualizarFechaModificacion(tarea);

    return true;
};

export const cambiarDificultad = (tarea, nuevaDificultad) => {
    if (!tarea || !esDificultadValida(nuevaDificultad)) {
        return false;
    }

    tarea.dificultad = nuevaDificultad;
    actualizarFechaModificacion(tarea);

    return true;
};

export const obtenerTareas = () => {
    return [...tareas];
};
