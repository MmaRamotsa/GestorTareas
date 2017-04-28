## Sinopsis

Aplicación web para gestionar tareas pendientes.

## Motivación

El objetivo de empezar este proyecto es la comprensión del modo de utilizar Firebase para almacenar datos de una aplicación. Se trataba de aprender cómo dar de alta nuevos elementos, modificarlos y eliminarlos y ver que la página recoge las modificaciones sin tener que hacer una recarga.

## Instalación [en el caso de que haya que hacer algo para ejecutarlo]

Para ejecutar la palicación sólo hay que abrir la página index.html.

## Tests

Para comprobar que está haciendo bien la validación de los campos se pueden hacer las siguientes pruebas:

### Prueba de validaciones de la página Index

1. Pulsar el botón de completar una tarea pendiente y comprobar que el contador de tareas pendientes ha decrementado en 1 su valor.

2. Pulsar en el botón de ver la descripción de una tarea y comprobar que la ventana modal que se muestra se corresponde con la tarea seleccionada.

3. Borrar una tarea pendiente y comprobar que el contador de tareas pendientes ha decrementado en 1 su valor.

4. Borrar una tarea completada y comprobar que el contador de tareas pendientes no cambia su valor.

5. Pulsar el botón de editar una tarea y comprobar que se muestran los datos de la tarea, en especial el dato de la fecha límite en el caso de que la tenga.

6. Pulsar el botón de editar una tarea, modificar el asunto y pulsar guardar. Comprobar que se toman en cuenta los cambios en la lista de tareas.

7. Pulsar el botón de editar una tarea, vaciar el campo el asunto y pulsar guardar. Comprobar que se produce un error.

8. Pulsar el botón de editar una tarea, poner una fecha del pasado y pulsar guardar. Comprobar que se produce un error.

### Prueba de validaciones de la página Nueva Tarea

1. Pulsar el botón de aceptar cambios habiendo dejado el campo asunto vacío.

2. Introducir un asunto compuesto sólo de espacios en blanco y pulsar el botón aceptar.

3. Introducir un texto para el asunto, dejar la fecha vacía y pulsar el botón aceptar. La fecha no es un dato obligatorio así que no debe dar error. Se mostrará la página de la lista de tareas y dentro de la lista estará la tarea nueva con la columna fecha en blanco.

4. Introducir un texto para el asunto, seleccionar una fecha del pasado y pulsar el botón aceptar. Tiene que dar el error de que la fecha no puede ser del pasado.

## Licencia

Licencia Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0).


## Autores

Mª Antonia Martínez García.

## Fecha

28/04/2017

## Versión

Última versión v1.2.