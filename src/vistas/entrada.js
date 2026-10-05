import rl from "readline-sync";
import {
  errorTitulo,
  errorDescripcion,
  parsearFecha,
} from "../servicios/servicioTarea.js";
import {
  ESTADOS,
  DIFICULTADES,
  NOMBRES_DIFICULTAD,
} from "../constantes/tarea.js";
import { ERRORES } from "../constantes/errores.js";

export const elegirOpcion = (opciones, titulo, cancelar) => {
  return rl.keyInSelect(opciones, titulo, { cancel: cancelar, guide: false });
};

// en los pedirX, actual es el valor que ya tiene la tarea:
// dejar vacio lo mantiene.
export const pedirTitulo = (actual) => {
  while (true) {
    const texto = rl.question("Titulo: ");

    if (texto === "" && actual !== "") {
      return actual;
    }

    const error = errorTitulo(texto);

    if (error === null) {
      return texto.trim();
    }

    console.log(error);
  }
};

export const pedirDescripcion = (actual) => {
  while (true) {
    const texto = rl.question("Descripcion: ");

    if (texto === "") {
      return actual;
    }

    const error = errorDescripcion(texto);

    if (error === null) {
      return texto.trim();
    }

    console.log(error);
  }
};

export const pedirVencimiento = (actual) => {
  while (true) {
    const texto = rl.question("Vencimiento dd/mm/aaaa: ");

    if (texto === "") {
      return actual;
    }

    if (texto.trim() === "") {
      return null;
    }

    const fecha = parsearFecha(texto.trim());

    if (fecha !== null) {
      return fecha;
    }

    console.log(ERRORES.FECHA_INVALIDA);
  }
};

export const pedirEstado = (actual) => {
  const estados = Object.values(ESTADOS);
  const indice = elegirOpcion(estados, "Estado: ", "Dejar como esta");

  if (indice === -1) {
    return actual;
  }

  return estados[indice];
};

export const pedirDificultad = (actual) => {
  const nombres = Object.values(NOMBRES_DIFICULTAD);
  const indice = elegirOpcion(nombres, "Dificultad: ", "Dejar como esta");

  if (indice === -1) {
    return actual;
  }

  return Object.values(DIFICULTADES)[indice];
};

export const elegirTarea = (tareas) => {
  const titulos = [];

  for (const tarea of tareas) {
    titulos.push(`${tarea.titulo} | ${tarea.estado}`);
  }

  const indice = elegirOpcion(titulos, "Elegi una tarea: ", "Volver");

  if (indice === -1) {
    return null;
  }

  return tareas[indice];
};
