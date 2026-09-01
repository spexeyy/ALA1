import rl from "readline-sync";
import {
  agregarTarea,
  cambiarEstado,
  cambiarDificultad,
  setearVencimiento,
  hayTareas,
} from "../servicios/servicioTarea.js";
import { mostrarTareas } from "./vistaTarea.js";

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
        mostrarTareas();
        break;
      }

      case "2": {
        const titulo = rl.question("Titulo: ");
        const descripcion = rl.question("Descripcion: ");

        const tarea = agregarTarea(titulo, descripcion);

        if (!tarea) {
          console.log("No se pudo agregar la tarea");
          break;
        }

        console.log(`Tarea creada con el ID ${tarea.id}`);
        break;
      }

      case "3": {
        if (!hayTareas()) {
          console.log("No hay tareas");
          break;
        }

        const id = rl.questionInt("ID: ");
        const estado = rl.question("Estado: ");

        if (!cambiarEstado(id, estado)) {
          console.log("No se pudo cambiar el estado");
          break;
        }

        console.log(`Estado cambiado a ${estado}`);
        break;
      }

      case "4": {
        if (!hayTareas()) {
          console.log("No hay tareas");
          break;
        }

        mostrarTareas();

        const id = rl.questionInt("ID: ");
        const dificultad = rl.questionInt("Dificultad (1-3): ");

        if (!cambiarDificultad(id, dificultad)) {
          console.log("No se pudo cambiar la dificultad");
          break;
        }

        console.log(`Dificultad cambiada a ${dificultad}`);
        break;
      }

      case "5": {
        if (!hayTareas()) {
          console.log("No hay tareas");
          break;
        }

        mostrarTareas();

        const id = rl.questionInt("ID: ");
        const vencimiento = rl.question("Vencimiento: ");

        if (!setearVencimiento(id, vencimiento)) {
          console.log("No se pudo setear el vencimiento");
          break;
        }

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
