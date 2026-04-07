# Proyecto Taskflow #

 Cómo funciona TaskFlow (Lógica y Diseño)

- La idea principal de la aplicación es tenerlo todo a la vista en una sola pantalla, dividida en dos partes principales: un panel de control a la izquierda y la lista de tareas a la derecha.

- Panel Lateral (Izquierda)
Es el "cerebro" donde controlamos todo. Tiene un botón central para poder colapsar el menú si queremos ganar espacio en la pantalla.

- Buscador: Está arriba del todo como "Buscar tarea". Permite filtrar las tareas guardadas buscando directamente por su #ID o por una palabra clave.

- Tarjetas de Estadísticas (Filtros): Tenemos 3 botones principales: Total, Pendiente y Completadas. El número (NUM) se actualiza al instante sumando o restando según lo que hagamos. Además, son interactivos: si pulsas por ejemplo en "Pendientes", la lista de la derecha te filtra y te muestra solo "Pendientes".

- Agregar Tarea: Al pulsarlo, se abre un pequeño formulario para poner un título (útil para luego buscar por palabra clave) y una descripción opcional.
Además automaticamente se te abre una ventana de confirmacion:
    - NUM tarea
    - NOMBRE tarea
    - ID tarea
        -confirmacion-

- Zona de Tareas (Derecha)
La lista tiene su propia barra de scroll para deslizar cómodamente.
- Orden en cascada: Siempre que creas una tarea nueva, se coloca la "anitgua" debajo de la nueva.

- Por el momento no hay botones de "Borrar todo" o "Todas completado".

- ¿Cómo interactuamos con cada Tarea?
Todas las tareas en la lista funcionan como botones independientes.
De manera breve podemos ver su NUM + Nombre + #ID.

- Ampliar: Si pulsas en medio de la tarea , se despliega una ventana para poder ver el NOMBRE la DESCRIPCION y nuevamente la #ID oel NUM si este fuera muy largo, dentro de la misma podemos editar la DESCRIPCION o el NOMBRE

Marcar como Completado: A la izquierda tienen un círculo interactivo. Al pulsarlo, no salen ventanas de confirmación molestas; simplemente el borde y el círculo cambian a color verde, la opacidad del texto baja a un 60% y el nombre se tacha. Si te equivocas, le das otra vez y se desmarca.

Borrar: A la derecha de cada tarea tenemos los botones para borrarla definitivamente.