const mostrarDificultad = (dificultad) => {
    return "★".repeat(dificultad)
}

export const mostrarTarea = (tarea) => {
    console.log(`
        Id: ${tarea.id}
        Título: ${tarea.titulo}
        Descripción: ${tarea.descripcion}
        Estado: ${tarea.estado}
        Dificultad: ${mostrarDificultad(tarea.dificultad)}
        Creada: ${tarea.fechaCreacion}
        Modificada: ${tarea.fechaModificacion}
        Vencimiento: ${tarea.vencimiento}`
        );
};

export const mostrarTareas = (tareas) => {
    tareas.forEach((tarea) => {
        mostrarTarea(tarea);
    });
};
