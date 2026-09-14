import { LIMITES } from "../constantes/tarea.js";
import { ERRORES } from "../constantes/errores.js";
import { crearTarea } from "../modelos/modeloTarea.js";

const tareas = [];
let siguienteId = 1;

export const parsearFecha = (texto) => {
  const partes = texto.split("/");

  if (partes.length !== 3) {
    return null;
  }

  const dia = Number(partes[0]);
  const mes = Number(partes[1]);
  const anio = Number(partes[2]);
  const fecha = new Date(anio, mes - 1, dia);

  // date acomoda los desbordes (32/01 -> 01/02), asi que comparamos de vuelta
  if (
    fecha.getDate() !== dia ||
    fecha.getMonth() !== mes - 1 ||
    fecha.getFullYear() !== anio
  ) {
    return null;
  }

  return fecha;
};

export const errorTitulo = (titulo) => {
  if (titulo.trim() === "") {
    return ERRORES.TITULO_VACIO;
  }

  if (titulo.trim().length > LIMITES.TITULO) {
    return ERRORES.TITULO_LARGO;
  }

  return null;
};

export const errorDescripcion = (descripcion) => {
  if (descripcion.trim().length > LIMITES.DESCRIPCION) {
    return ERRORES.DESCRIPCION_LARGA;
  }

  return null;
};

export const buscarTareaPorId = (id) => {
  for (const tarea of tareas) {
    if (tarea.id === id) {
      return tarea;
    }
  }

  return null;
};

export const agregarTarea = (titulo, descripcion, estado, dificultad, vencimiento) => {
  const tarea = crearTarea(
    siguienteId,
    titulo,
    descripcion,
    estado,
    dificultad,
    vencimiento,
  );

  tareas.push(tarea);
  siguienteId++;

  return tarea;
};

export const editarTarea = (
  id,
  titulo,
  descripcion,
  estado,
  dificultad,
  vencimiento,
) => {
  const tarea = buscarTareaPorId(id);

  tarea.titulo = titulo;
  tarea.descripcion = descripcion;
  tarea.estado = estado;
  tarea.dificultad = dificultad;
  tarea.vencimiento = vencimiento;
  tarea.fechaModificacion = new Date();

  return tarea;
};

export const obtenerTareas = () => {
  return [...tareas];
};

export const filtrarTareasPorEstado = (estado) => {
  const encontradas = [];

  for (const tarea of tareas) {
    if (tarea.estado === estado) {
      encontradas.push(tarea);
    }
  }

  return encontradas;
};

export const buscarTareasPorTitulo = (clave) => {
  const buscado = clave.trim().toLowerCase();
  const encontradas = [];

  for (const tarea of tareas) {
    if (tarea.titulo.toLowerCase().includes(buscado)) {
      encontradas.push(tarea);
    }
  }

  return encontradas;
};
