import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";
import { crearTarea } from "../modelos/tarea.js";

const tareas = [];
let siguienteId = 0;

const actualizarFechaModificacion = (tarea) => {
  tarea.fechaModificacion = new Date();
};

const esEstadoValido = (estado) => {
  return Object.values(ESTADOS).includes(estado);
};

const esDificultadValida = (dificultad) => {
  return Object.values(DIFICULTADES).includes(dificultad);
};

export const hayTareas = () => {
  return tareas.length > 0;
};


const buscarTareaPorId = (id) => {
  for (const tarea of tareas) {
    if (tarea.id === id) {
      return tarea;
    }
  }

  return null;
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

export const cambiarEstado = (id, nuevoEstado) => {
  if (!esEstadoValido(nuevoEstado)) {
    return false;
  }

  // reemplazar con .find cuando sea posible
  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    return false;
  }

  tarea.estado = nuevoEstado;
  actualizarFechaModificacion(tarea);

  return true;
};

export const cambiarDificultad = (id, nuevaDificultad) => {
  if (!esDificultadValida(nuevaDificultad)) {
    return false;
  }

  // reemplazar con .find cuando sea posible
  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    return false;
  }

  tarea.dificultad = nuevaDificultad;
  actualizarFechaModificacion(tarea);

  return true;
};

export const obtenerTareas = () => {
  return [...tareas];
};