# RAK$ CLUB MAGAZINE - Frontend & CMS Architecture

Bienvenido a la documentación técnica y de gestión de RAK$ CLUB MAGAZINE. Este proyecto está construido con una arquitectura moderna Headless utilizando **Next.js**, **React Three Fiber (3D)** y **Sanity.io**.

## 🎨 Visual Editing: Edición en Tiempo Real (Cero Código)

Este proyecto está configurado con `@sanity/visual-editing` (Draft Mode + Stega metadata). Esto significa que **ningún texto está anclado en el código fuente**. 

### ¿Cómo cambiar los títulos gigantes, botones y textos estructurales?
1. Inicia sesión en tu panel de Sanity Studio (ej. `tusitio.com/studio`).
2. En el menú superior de Sanity, haz clic en la pestaña **Presentation**.
3. Verás la página web interactiva dividida en tu pantalla. Navega por tu web de manera normal.
4. Pasa el ratón sobre cualquier texto (por ejemplo, el título gigante "RAK$ CLUB"). Verás que se ilumina con un recuadro azul y un icono de un lápiz.
5. **Haz clic sobre el texto en la propia previsualización**.
6. A la izquierda, se abrirá instantáneamente el documento `Configuración General` (`siteConfig`) apuntando directamente al campo que debes editar.
7. Modifica el texto y se actualizará al instante en tu previsualización gracias a la tecnología Stega de Next.js. Pulsa **Publish** cuando estés listo.

## 📝 Gestión de la Comunidad: Lógica de Estados de Revisión

La sección `/comunidad` está diseñada para recibir contenido de usuarios externos (mediante el formulario de la web). Para mantener el control editorial, se implementa el siguiente flujo de estados:

1. **Borrador (Draft)**: 
   Cuando un usuario rellena el formulario de la web (o envías datos vía API), el documento entra en Sanity como "Borrador". *No es visible en la web pública.*
2. **En Revisión (In Review)**:
   Los editores de la revista revisan la fotografía, la historia y la información del participante. En este estado se pueden hacer anotaciones internas o realizar correcciones ortográficas. *No es visible en la web pública.*
3. **Aprobado (Approved)**:
   El contenido es válido a nivel editorial y está listo para salir, pero se programará para una fecha de lanzamiento o se retendrá para sacar varios de golpe. *No es visible en la web pública.*
4. **Publicado (Published)**:
   El administrador de Sanity hace clic en el botón verde de "Publish". A partir de este segundo, la caché de Next.js (ISR/Revalidation) se actualiza y el participante aparece de inmediato en la sección `/comunidad` y galerías correspondientes en vivo.

### Notas para Desarrolladores (Performance)
El Hero 3D de esta aplicación está altamente optimizado. El Canvas de R3F se desactiva dinámicamente (`frameloop="never"`) a través de un `IntersectionObserver / ScrollTrigger` en cuanto la sección de aterrizaje sale del viewport, salvaguardando la batería y el rendimiento en dispositivos móviles.
