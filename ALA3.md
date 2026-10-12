# Aplicando lo Aprendido 3

## Ejercicio 1

### 1. Generalización simbólica

JavaScript se basa en prototipos para trabajar con objetos. Sus principales características son:

- Todo es un objeto o un valor primitivo.
- Los objetos tienen propiedades que guardan valores o funciones (métodos).
- Cada objeto tiene un prototipo, que es otro objeto del que puede obtener propiedades y métodos.
- Si un objeto no tiene una propiedad, JavaScript la busca en su prototipo y sigue buscando hasta encontrarla o llegar a `null`.
- Los objetos se pueden crear con `{}`, con `Object.create()` o usando funciones constructoras y `new`.
- El valor de `this` depende de cómo se llama al método.
- Se pueden agregar, modificar o eliminar propiedades mientras el programa se ejecuta.
- Las clases (`class`) también usan prototipos internamente.

```js
const animal = {
  saludar() {
    return "Hola, soy " + this.nombre;
  },
};

const perro = Object.create(animal);
perro.nombre = "Toby";

perro.saludar(); // "Hola, soy Toby"
```

En este ejemplo, `perro` usa el método `saludar()` de `animal` porque lo tiene como prototipo.

### 2. Creencias de los profesionales

- **Es más simple:** no hace falta crear clases para trabajar con objetos.
- **Es flexible:** se pueden agregar o modificar propiedades y métodos cuando sea necesario.
- **Permite compartir métodos:** varios objetos pueden usar los mismos métodos mediante sus prototipos.
- **Favorece la composición:** se pueden combinar objetos sin depender tanto de la herencia.
- **Se puede combinar con otros estilos:** JavaScript permite usar programación orientada a objetos y funcional.
- **Es práctico:** los objetos se pueden crear fácilmente usando `{}` y agregarles las propiedades necesarias.

## Ejercicio 4

### Características que usé

**Objetos y abstracción.** Usé dos objetos principales: la tarea y la lista de tareas. La tarea guarda sus datos y el método para editarla. La lista guarda las tareas y tiene métodos para agregarlas, buscarlas y eliminarlas.

**Prototipos y delegación.** Creé las tareas con `Object.create(prototipoTarea)`. Así, todas pueden usar el método `editar()` sin tener que copiarlo en cada objeto.

```ts
const prototipoTarea = {
  editar(this: Tarea, titulo: string): void {
    this.titulo = titulo;
    this.fechaModificacion = new Date();
  },
};

const tarea: Tarea = Object.create(prototipoTarea);
```

**Encapsulamiento.** Agrupé los datos y los métodos de la lista en un mismo objeto. De esta forma, la lista puede manejar sus tareas desde sus propios métodos.

```ts
export const listaTareas = {
  tareas: [] as Tarea[],
  siguienteId: 1,

  // Métodos para manejar las tareas
};
```

**Mensajes.** Las vistas llaman a los métodos de los objetos para realizar acciones. Por ejemplo, `tarea.editar()` para modificar una tarea o `listaTareas.filtrarPorEstado()` para filtrar la lista.

### Características que no usé

**Ocultamiento de información.** Las propiedades son públicas, por lo que se pueden modificar desde afuera. No lo implementé porque el programa es pequeño y no me pareció necesario.

**Polimorfismo.** No lo usé porque todas las tareas funcionan de la misma manera. Sería útil si existieran distintos tipos de tareas con comportamientos diferentes.

**Herencia en varios niveles.** No hizo falta porque solo tengo un tipo de tarea y no necesito una estructura de herencia más compleja.

**Prototipo para la lista.** La lista es un objeto literal y no necesita un prototipo propio, porque solo hay una lista de tareas.

**Clases.** No las usé porque el ejercicio se basa en trabajar con prototipos.

**Objetos en las vistas.** Las vistas siguen siendo funciones porque se encargan de mostrar opciones y llamar a los métodos del modelo. No necesitaba convertirlas en objetos.