export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  dificultad: number;
  vencimiento: Date | null;
  fechaCreacion: Date;
  fechaModificacion: Date;
  editar(
    titulo: string,
    descripcion: string,
    estado: string,
    dificultad: number,
    vencimiento: Date | null,
  ): void;
};

const prototipoTarea = {
  editar(
    this: Tarea,
    titulo: string,
    descripcion: string,
    estado: string,
    dificultad: number,
    vencimiento: Date | null,
  ): void {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.dificultad = dificultad;
    this.vencimiento = vencimiento;
    this.fechaModificacion = new Date();
  },
};

export const crearTarea = (
  id: number,
  titulo: string,
  descripcion: string,
  estado: string,
  dificultad: number,
  vencimiento: Date | null,
): Tarea => {
  const tarea: Tarea = Object.create(prototipoTarea);
  const ahora = new Date();

  tarea.id = id;
  tarea.titulo = titulo;
  tarea.descripcion = descripcion;
  tarea.estado = estado;
  tarea.dificultad = dificultad;
  tarea.vencimiento = vencimiento;
  tarea.fechaCreacion = ahora;
  tarea.fechaModificacion = ahora;

  return tarea;
};
