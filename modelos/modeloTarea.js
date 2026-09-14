export const crearTarea = (
  id,
  titulo,
  descripcion,
  estado,
  dificultad,
  vencimiento, ) => {
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
