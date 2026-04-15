# Experimentos de Desarrollo: Implementación Manual vs IA

## 4. Refactorización Integral del Código con Cursor

Se utilizó la IA integrada en Cursor para realizar una refactorización completa de la base de código (HTML, CSS y JS). El objetivo fue optimizar la arquitectura interna sin alterar el comportamiento funcional ni visual de la aplicación.

**Cambios estructurales implementados:**

* **Optimización HTML:** Se incorporaron atributos `data-filter` en las tarjetas de estadísticas y se agruparon en un contenedor principal (`id="filters"`). Esto permite delegar la lógica de filtrado al marcado, reduciendo la necesidad de identificadores individuales.
* **Limpieza CSS:** Se compactaron reglas, agrupando selectores repetidos y eliminando comentarios innecesarios. Se introdujo una clase dinámica `.active` para gestionar el estado visual del filtro seleccionado desde JavaScript.
* **Mejoras de rendimiento en JavaScript:**
  * **Delegación de eventos:** Se eliminaron los *event listeners* individuales para cada botón y *checkbox* de las tareas. En su lugar, se aplicó un único *listener* al contenedor padre (`<ul>`), mejorando drásticamente el uso de memoria y el rendimiento.
  * **Centralización del estado:** Se implementó una función `commit()` que actúa como única fuente de verdad. Esta función recibe el nuevo estado de las tareas, actualiza el LocalStorage y fuerza el renderizado en un solo paso.
  * **Simplificación lógica:** El sistema de filtrado se redujo a una única función abstracta (`passFilter`), aprovechando los atributos de datos del HTML.

**Conclusión del experimento:**
La IA aplicó patrones arquitectónicos avanzados propios del desarrollo profesional en cuestión de segundos. El resultado es un código más corto, escalable, con menos puntos de fallo y mucho más sencillo de mantener.