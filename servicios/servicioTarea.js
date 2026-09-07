import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";
import { ERRORES } from "../constantes/errores.js"
import { crearTarea } from "../modelos/modeloTarea.js";

const tareas = [];
let siguienteId = 1;

const exito = (valor = null) => ({ ok: true, valor });
const fallo = (error) => ({ ok: false, error });

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

export const filtrarTareasPorEstado = (estado) => {
  if (!esEstadoValido(estado)) {
    return fallo(ERRORES.ESTADO_INVALIDO);
  }

  const encontrados = [];

  for (const tarea of tareas) {
    if (tarea.estado === estado) {
      encontrados.push(tarea);
    }
  }

  return exito(encontrados);
}

const buscarTareaPorId = (id) => {
  for (const tarea of tareas) {
    if (tarea.id === id) {
      return tarea;
    }
  }

  return null;
};

export const agregarTarea = (titulo, descripcion) => {
  if (!titulo || titulo.trim() === "") {
    return fallo(ERRORES.TITULO_VACIO);
  }

  const tarea = crearTarea(siguienteId, titulo, descripcion);

  tareas.push(tarea);
  siguienteId++;

  return exito(tarea);
};

export const cambiarEstado = (id, nuevoEstado) => {
  if (!esEstadoValido(nuevoEstado)) {
    return fallo(ERRORES.ESTADO_INVALIDO);
  }

  // reemplazar con .find cuando sea posible
  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    return fallo(ERRORES.TAREA_NO_ENCONTRADA);
  }

  tarea.estado = nuevoEstado;
  actualizarFechaModificacion(tarea);

  return exito(tarea);
};

export const cambiarDificultad = (id, nuevaDificultad) => {
  if (!esDificultadValida(nuevaDificultad)) {
    return fallo(ERRORES.DIFICULTAD_INVALIDA);
  }

  // reemplazar con .find cuando sea posible
  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    return fallo(ERRORES.TAREA_NO_ENCONTRADA);
  }

  tarea.dificultad = nuevaDificultad;
  actualizarFechaModificacion(tarea);

  return exito(tarea);
};

export const cambiarTitulo = (id, titulo) => {
  if (!titulo || titulo.trim() === "") {
    return fallo(ERRORES.TITULO_VACIO);
  }

  const tarea = buscarTareaPorId(id);

  if (!tarea) {
    return fallo(ERRORES.TAREA_NO_ENCONTRADA);
  }

  tarea.titulo = titulo.trim();
  actualizarFechaModificacion(tarea);

  return exito(tarea);
}

export const obtenerTareas = () => {
  return [...tareas];
};