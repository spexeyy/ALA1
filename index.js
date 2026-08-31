import { agregarTarea, obtenerTareas } from "./servicios/servicioTarea.js";
import { mostrarTareas } from "./vistas/vistaTarea.js";

agregarTarea("bueee", "anachex");

mostrarTareas(obtenerTareas());
