import { LIMITES } from "../constantes/tarea.js";
import { ERRORES } from "../constantes/errores.js";
import { crearTarea } from "../modelos/modeloTarea.js";
import type { Tarea } from "../modelos/modeloTarea.js";

export const parsearFecha = (texto: string): Date | null => {
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

export const errorTitulo = (titulo: string): string | null => {
  if (titulo.trim() === "") {
    return ERRORES.TITULO_VACIO;
  }

  if (titulo.trim().length > LIMITES.TITULO) {
    return ERRORES.TITULO_LARGO;
  }

  return null;
};

export const errorDescripcion = (descripcion: string): string | null => {
  if (descripcion.trim().length > LIMITES.DESCRIPCION) {
    return ERRORES.DESCRIPCION_LARGA;
  }

  return null;
};

export const listaTareas = {
  tareas: [] as Tarea[],
  siguienteId: 1,

  agregar(
    titulo: string,
    descripcion: string,
    estado: string,
    dificultad: number,
    vencimiento: Date | null,
  ): Tarea {
    const tarea = crearTarea(
      this.siguienteId,
      titulo,
      descripcion,
      estado,
      dificultad,
      vencimiento,
    );

    this.tareas.push(tarea);
    this.siguienteId++;

    return tarea;
  },

  eliminar(id: number): void {
    for (let i = 0; i < this.tareas.length; i++) {
      if (this.tareas[i].id === id) {
        this.tareas.splice(i, 1);
      }
    }
  },

  obtenerTodas(): Tarea[] {
    return [...this.tareas];
  },

  filtrarPorEstado(estado: string): Tarea[] {
    const encontradas: Tarea[] = [];

    for (const tarea of this.tareas) {
      if (tarea.estado === estado) {
        encontradas.push(tarea);
      }
    }

    return encontradas;
  },

  buscarPorTitulo(clave: string): Tarea[] {
    const buscado = clave.trim().toLowerCase();
    const encontradas: Tarea[] = [];

    for (const tarea of this.tareas) {
      if (tarea.titulo.toLowerCase().includes(buscado)) {
        encontradas.push(tarea);
      }
    }

    return encontradas;
  },
};
