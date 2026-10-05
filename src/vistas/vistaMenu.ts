import rl from "readline-sync";
import {
  agregarTarea,
  obtenerTareas,
  filtrarTareasPorEstado,
  buscarTareasPorTitulo,
} from "../servicios/servicioTarea.js";
import { ESTADOS, DIFICULTADES } from "../constantes/tarea.js";
import { ERRORES } from "../constantes/errores.js";
import {
  elegirOpcion,
  elegirTarea,
  pedirTitulo,
  pedirDescripcion,
  pedirVencimiento,
  pedirEstado,
  pedirDificultad,
} from "./entrada.js";
import { mostrarVistaDetalle } from "./vistaTarea.js";
import type { Tarea } from "../modelos/modeloTarea.js";

const mostrarVistaListado = (tareas: Tarea[]): void => {
  if (tareas.length === 0) {
    console.log(ERRORES.SIN_TAREAS);
    return;
  }

  const ordenadas = tareas.sort((a, b) => a.titulo.localeCompare(b.titulo));
  const tarea = elegirTarea(ordenadas);

  if (tarea !== null) {
    mostrarVistaDetalle(tarea);
  }
};

const mostrarMenuVerTareas = (): void => {
  const opciones = [
    "Todas",
    "Pendientes",
    "En curso",
    "Terminadas",
    "Canceladas",
  ];
  let seguir = true;

  while (seguir) {
    const indice = elegirOpcion(opciones, "Ver mis tareas: ", "Volver");

    switch (indice) {
      case 0:
        mostrarVistaListado(obtenerTareas());
        break;

      case 1:
        mostrarVistaListado(filtrarTareasPorEstado(ESTADOS.PENDIENTE));
        break;

      case 2:
        mostrarVistaListado(filtrarTareasPorEstado(ESTADOS.EN_CURSO));
        break;

      case 3:
        mostrarVistaListado(filtrarTareasPorEstado(ESTADOS.TERMINADA));
        break;

      case 4:
        mostrarVistaListado(filtrarTareasPorEstado(ESTADOS.CANCELADA));
        break;

      case -1:
        seguir = false;
        break;
    }
  }
};

const mostrarMenuBuscar = (): void => {
  const clave = rl.question("Buscar: ");

  if (clave.trim() === "") {
    console.log(ERRORES.CLAVE_VACIA);
    return;
  }

  const encontradas = buscarTareasPorTitulo(clave);

  if (encontradas.length === 0) {
    console.log(ERRORES.SIN_RESULTADOS);
    return;
  }

  mostrarVistaListado(encontradas);
};

const mostrarMenuAgregar = (): void => {
  console.log("\nDeja vacio lo que no quieras cargar.");

  const titulo = pedirTitulo("");
  const descripcion = pedirDescripcion("");
  const vencimiento = pedirVencimiento(null);
  const estado = pedirEstado(ESTADOS.PENDIENTE);
  const dificultad = pedirDificultad(DIFICULTADES.FACIL);

  const tarea = agregarTarea(
    titulo,
    descripcion,
    estado,
    dificultad,
    vencimiento,
  );

  console.log(`\nTarea guardada con el ID ${tarea.id}`);
};

export const mostrarMenu = (): void => {
  const opciones = ["Ver mis tareas", "Buscar una tarea", "Agregar una tarea"];
  let seguir = true;

  while (seguir) {
    const indice = elegirOpcion(opciones, "Menu principal: ", "Salir");

    switch (indice) {
      case 0:
        mostrarMenuVerTareas();
        break;

      case 1:
        mostrarMenuBuscar();
        break;

      case 2:
        mostrarMenuAgregar();
        break;

      case -1:
        seguir = false;
        break;
    }
  }
};
