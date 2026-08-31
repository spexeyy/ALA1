import { ESTADOS, DIFICULTADES } from "./constantes/tarea.js"
import {
    agregarTarea,
    cambiarEstado,
    cambiarDificultad,
    obtenerTareas
} from "./servicios/servicioTarea.js";

    const tarea1 = agregarTarea("bueee", "anachex");

    mostrarTareas();