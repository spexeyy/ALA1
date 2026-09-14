import { LIMITES } from "./tarea.js";

export const ERRORES = {
  OPCION_INVALIDA: "Opcion invalida",
  SIN_TAREAS: "Sin tareas",
  CLAVE_VACIA: "Ingresa una clave de busqueda",
  SIN_RESULTADOS: "Ninguna tarea coincide con la busqueda",
  TITULO_VACIO: "El titulo no puede estar vacio",
  TITULO_LARGO: `El titulo no puede superar los ${LIMITES.TITULO} caracteres`,
  DESCRIPCION_LARGA: `La descripcion no puede superar los ${LIMITES.DESCRIPCION} caracteres`,
  TAREA_NO_ENCONTRADA: "Tarea no encontrada",
  ESTADO_INVALIDO: "Estado invalido",
  DIFICULTAD_INVALIDA: "Dificultad invalida",
  FECHA_INVALIDA: "Fecha invalida, usa dd/mm/aaaa",
};
