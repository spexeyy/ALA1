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
import type { Tarea } from "../modelos/modeloTarea.js";

export const elegirOpcion = (
  opciones: string[],
  titulo: string,
  cancelar: string,
): number => {
  return rl.keyInSelect(opciones, titulo, { cancel: cancelar, guide: false });
};

// en los pedirX, actual es el valor que ya tiene la tarea:
// dejar vacio lo mantiene.
export const pedirTitulo = (actual: string): string => {
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

export const pedirDescripcion = (actual: string): string => {
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

export const pedirVencimiento = (actual: Date | null): Date | null => {
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

export const pedirEstado = (actual: string): string => {
  const estados = Object.values(ESTADOS);
  const indice = elegirOpcion(estados, "Estado: ", "Dejar como esta");

  if (indice === -1) {
    return actual;
  }

  return estados[indice];
};

export const pedirDificultad = (actual: number): number => {
  const nombres = Object.values(NOMBRES_DIFICULTAD);
  const indice = elegirOpcion(nombres, "Dificultad: ", "Dejar como esta");

  if (indice === -1) {
    return actual;
  }

  return Object.values(DIFICULTADES)[indice];
};

export const elegirTarea = (tareas: Tarea[]): Tarea | null => {
  const titulos: string[] = [];

  for (const tarea of tareas) {
    titulos.push(`${tarea.titulo} | ${tarea.estado}`);
  }

  const indice = elegirOpcion(titulos, "Elegi una tarea: ", "Volver");

  if (indice === -1) {
    return null;
  }

  return tareas[indice];
};
