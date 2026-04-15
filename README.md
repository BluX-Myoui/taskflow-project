# TaskFlow - Gestor de Tareas Profesional

TaskFlow es una aplicación web de gestión de tareas (Single Page Application) diseñada para ofrecer una experiencia de usuario fluida y eficiente, estructurada en un panel de control lateral y un área principal de visualización.

## Características Principales

### Panel Lateral (Control y Estadísticas)
- **Buscador en tiempo real:** Filtra las tareas de forma instantánea por título o identificador único (#ID).
- **Filtros Interactivos:** Tarjetas dinámicas que muestran el conteo en tiempo real de tareas Totales, Pendientes y Completadas. Actúan como filtros visuales para la lista principal.
- **Formulario de Ingreso:** Permite añadir nuevas tareas rápidamente mediante la tecla Enter o el botón dedicado.

### Área Principal (Gestión de Tareas)
- **Acciones Masivas:**
  - **A-Z:** Ordena alfabéticamente la lista actual.
  - **Todas:** Marca todas las tareas visibles como completadas.
  - **Deshacer:** Recupera la última tarea eliminada en su posición original.
  - **Limpiar:** Elimina permanentemente las tareas completadas (requiere confirmación previa).
- **Interacción por Tarea:**
  - **Completar:** Checkbox para alternar el estado de la tarea (aplica estilos de tachado y opacidad).
  - **Editar:** Permite modificar el título de la tarea mediante un cuadro de diálogo nativo.
  - **Borrar:** Elimina la tarea de forma individual.

## Documentación de Funciones Principales (app.js)

El núcleo de la aplicación utiliza un patrón de diseño basado en la gestión centralizada del estado, optimizado mediante la delegación de eventos en el DOM.

- `uid()`: Genera un identificador único de 4 caracteres basado en la marca de tiempo actual del sistema.
- `passFilter(task)`: Evalúa si un objeto de tarea debe mostrarse en pantalla basándose en el filtro activo actual ('all', 'pending', 'completed'). Retorna un valor booleano.
- `render()`: Función encargada de sincronizar la interfaz de usuario con el estado de los datos. Actualiza los contadores del panel lateral, gestiona las clases CSS dinámicas y reconstruye los nodos del DOM para la lista de tareas, aplicando los filtros de búsqueda y estado pertinentes.
- `commit(nextTasks)`: Actúa como el controlador principal de mutación del estado. Recibe un nuevo array de tareas, actualiza la variable global, persiste los datos en `localStorage` y llama a `render()` para repintar la vista.

## Ejemplos de Uso

**Escenario 1: Flujo de trabajo básico**
1. Escribe "Revisar correo electrónico" en el formulario lateral y presiona Enter.
2. La tarea aparece inmediatamente en el área principal con un identificador asignado.
3. Al finalizarla, haz clic en el checkbox situado a la izquierda de la tarea. La tarjeta adoptará un tono verde, el texto se tachará y el contador lateral de "Completadas" se incrementará automáticamente.

**Escenario 2: Limpieza y recuperación de errores**
1. Con varias tareas completadas acumuladas, haz clic en el botón rojo "Limpiar" en las acciones masivas.
2. El sistema solicitará confirmación indicando el número exacto de tareas a eliminar. Al aceptar, la lista se limpiará.
3. Si eliminas una tarea por error utilizando el botón individual de borrado (X), el botón "Deshacer" en el panel superior se habilitará. Púlsalo para restaurar la tarea eliminada a su índice original.

**Escenario 3: Búsqueda y edición ágil**
1. Ante una lista extensa, utiliza la barra "Buscar Tarea" introduciendo una palabra clave. La vista se actualizará en tiempo real mostrando solo las coincidencias.
2. Localiza la tarea deseada y haz clic en el icono de edición (lápiz).
3. Modifica el texto en la ventana emergente y acepta. El título se actualizará conservando el identificador y el estado de completado original.