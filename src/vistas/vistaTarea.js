import { DIFICULTADES } from "../constantes/tarea.js";
import { editarTarea, eliminarTarea } from "../servicios/servicioTarea.js";
import {
  elegirOpcion,
  pedirTitulo,
  pedirDescripcion,
  pedirVencimiento,
  pedirEstado,
  pedirDificultad,
} from "./entrada.js";

const SIN_DATOS = "Sin datos";

const mostrarDificultad = (dificultad) => {
  const total = Object.keys(DIFICULTADES).length;

  return "★".repeat(dificultad) + "☆".repeat(total - dificultad);
};

const mostrarFecha = (fecha) => {
  if (fecha === null) {
    return SIN_DATOS;
  }

  return fecha.toLocaleDateString("es-AR");
};

const mostrarTexto = (texto) => {
  if (texto === "") {
    return SIN_DATOS;
  }

  return texto;
};

const mostrarDetalle = (tarea) => {
  console.log(`
Titulo:         ${tarea.titulo}
Descripcion:    ${mostrarTexto(tarea.descripcion)}
Estado:         ${tarea.estado}
Dificultad:     ${mostrarDificultad(tarea.dificultad)}
Vencimiento:    ${mostrarFecha(tarea.vencimiento)}
Creacion:       ${mostrarFecha(tarea.fechaCreacion)}
Ultima edicion: ${mostrarFecha(tarea.fechaModificacion)}`);
};

const editar = (tarea) => {
  console.log(
    "\nDeja vacio para mantener el valor actual o escribi un espacio para borrarlo.",
  );

  const titulo = pedirTitulo(tarea.titulo);
  const descripcion = pedirDescripcion(tarea.descripcion);
  const vencimiento = pedirVencimiento(tarea.vencimiento);
  const estado = pedirEstado(tarea.estado);
  const dificultad = pedirDificultad(tarea.dificultad);

  editarTarea(tarea.id, titulo, descripcion, estado, dificultad, vencimiento);

  console.log("\nTarea guardada");
};

export const mostrarVistaDetalle = (tarea) => {
  const opciones = ["Editar la tarea", "Eliminar la tarea"];
  let seguir = true;

  while (seguir) {
    mostrarDetalle(tarea);

    const indice = elegirOpcion(opciones, "Detalle: ", "Volver");

    switch (indice) {
      case 0:
        editar(tarea);
        break;

      case 1:
        eliminarTarea(tarea.id);
        console.log("\nTarea eliminada");
        seguir = false;
        break;

      case -1:
        seguir = false;
        break;
    }
  }
};
