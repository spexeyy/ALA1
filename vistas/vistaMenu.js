import rl from "readline-sync";
import {
  agregarTarea,
  cambiarEstado,
  cambiarDificultad,
  filtrarTareasPorEstado,
  hayTareas,
  obtenerTareas,
} from "../servicios/servicioTarea.js";
import { mostrarTareas } from "./vistaTarea.js";
import { ERRORES } from "../constantes/errores.js"
import { ESTADOS } from "../constantes/tarea.js";

// Submenu de "Ver tareas". Devuelve la lista elegida, o null si el usuario vuelve.
const elegirVista = () => {
  const estados = Object.values(ESTADOS);
  const opciones = [`Todas (${obtenerTareas().length})`];

  for (const estado of estados) {
    opciones.push(`${estado} (${filtrarTareasPorEstado(estado).valor.length})`);
  }

  const indice = rl.keyInSelect(opciones, "Ver: ", {
    cancel: "Volver",
    guide: false,
  });

  if (indice === -1) {
    return null;
  }

  if (indice === 0) {
    return obtenerTareas();
  }

  return filtrarTareasPorEstado(estados[indice - 1]).valor;
};

export const mostrarMenu = () => {
  let seguir = true;

  while (seguir) {
    console.log(`
1. Ver tareas
2. Agregar tarea
3. Cambiar estado
4. Cambiar dificultad
5. Setear vencimiento
0. Salir
    `);

    const opcion = rl.question("Elegi una opcion: ");

    switch (opcion) {
      case "1": {
        const lista = elegirVista();

        if (lista !== null) {
          mostrarTareas(lista);
        }

        break;
      }

      case "2": {
        const titulo = rl.question("Titulo: ");
        const descripcion = rl.question("Descripcion: ");

        const resultado = agregarTarea(titulo, descripcion);

        if (!resultado.ok) {
          console.log(resultado.error);
          break;
        }

        console.log(`Tarea creada con el ID ${resultado.valor.id}`);
        break;
      }

      case "3": {
        if (!hayTareas()) {
          console.log(ERRORES.SIN_TAREAS);
          break;
        }

        mostrarTareas();

        const id = rl.questionInt("ID: ");
        const estado = rl.question("Estado: ");

        const resultado = cambiarEstado(id, estado);

        if (!resultado.ok) {
          console.log(resultado.error);
          break;
        }

        console.log(`Estado cambiado a ${estado}`);
        break;
      }

      case "4": {
       if (!hayTareas()) {
          console.log(ERRORES.SIN_TAREAS);
          break;
        }

        mostrarTareas();

        const id = rl.questionInt("ID: ");
        const dificultad = rl.questionInt("Dificultad (1-3): ");

        const resultado = cambiarDificultad(id, dificultad);

        if (!resultado.ok) {
          console.log(resultado.error);
          break;
        }

        console.log(`Dificultad cambiada a ${dificultad}`);
        break;
      }

      case "5": {
       if (!hayTareas()) {
          console.log(ERRORES.SIN_TAREAS);
          break;
        }

        mostrarTareas();

        const id = rl.questionInt("ID: ");
        const vencimiento = rl.question("Vencimiento: ");

        // TODO

        console.log("Vencimiento seteado");
        break;
      }

      case "0": {
        seguir = false;
        break;
      }

      default: {
        console.log("Opcion invalida");
      }
    }
  }
};
