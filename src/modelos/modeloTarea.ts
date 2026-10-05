export type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  dificultad: number;
  vencimiento: Date | null;
  fechaCreacion: Date;
  fechaModificacion: Date;
};

export const crearTarea = (
  id: number,
  titulo: string,
  descripcion: string,
  estado: string,
  dificultad: number,
  vencimiento: Date | null,
): Tarea => {
  const ahora = new Date();

  return {
    id,
    titulo,
    descripcion,
    estado,
    dificultad,
    vencimiento,
    fechaCreacion: ahora,
    fechaModificacion: ahora,
  };
};
