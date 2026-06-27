# Guía de Uso del CMS (Sanity Studio)

Bienvenido al panel de administración de contenido de **RAK$ CLUB**. Este CMS (Content Management System) está construido con Sanity y te permite gestionar todo el contenido de la web sin necesidad de tocar código.

## ¿Qué es esto y cómo funciona?

El Studio es tu panel de control privado. Está incrustado directamente en la web (en la ruta `/studio`), pero solo tú (y los usuarios que autorices en tu proyecto de Sanity) podéis entrar. 

Cada vez que creas, modificas o eliminas algo aquí y le das a **"Publish"** (Publicar), los cambios se reflejan al instante en la base de datos de Sanity, y por lo tanto, en la web pública de RAK$ CLUB.

---

## Estructura del Panel

En la barra lateral izquierda verás tus **Colecciones** (o tipos de documentos). Aquí te explicamos para qué sirve cada una:

### 1. Configuración General
Aquí puedes cambiar cosas globales de la web, como las redes sociales, el texto del pie de página (footer) o mensajes globales. No suele modificarse a menudo.

### 2. Artículos Oficiales
Esta es la sección de noticias y crónicas oficiales redactadas por el equipo de RAK$ CLUB. 
*   **Título:** El titular del artículo.
*   **Slug:** La URL del artículo (se genera automáticamente a partir del título).
*   **Contenido:** Editor de texto enriquecido para escribir la crónica, donde puedes añadir imágenes y enlaces.
*   **Imagen Destacada:** La foto que saldrá en la portada y en la cabecera del artículo.

### 3. Contribuciones de la Comunidad
Al igual que los artículos oficiales, pero pensado para el contenido que sube la gente (foros, aportes, posts de invitados).

### 4. Vuelos (Eventos)
Gestiona aquí todas las fiestas pasadas y futuras.
*   Puedes añadir la **fecha**, el **lugar** (ej: DABADABA, SANTANA 27), y si el evento tiene entradas a la venta.
*   Si el vuelo ya ha pasado, puedes vincularlo a un álbum de la galería para que la gente vea las fotos.

### 5. Ediciones de Revista
Para subir las revistas digitales en formato PDF o visualizador.

### 6. Galería (Álbumes / Fotos)
¡El núcleo visual de RAK$ CLUB! Aquí creas los **"Paquetes"** que se ven en la sección de GALERÍA.
*   Al crear un nuevo álbum, ponle un **Título** (ej: CONEXIÓN URBANA).
*   Si está ligado a un evento específico, rellena el campo **Flight Name** (ej: VUELO N°53).
*   **Imágenes:** Sube todas las fotos que quieras. Puedes seleccionar varias de golpe. El orden en el que las pongas será el orden en el que se vean en la web (usando las flechas Anterior / Siguiente).

---

## Consejos Rápidos

1. **Guardado Automático:** Todo lo que escribes se guarda automáticamente como un **Draft** (Borrador). Nadie lo verá en la web hasta que presiones el botón verde de **Publish**.
2. **Deshacer Cambios:** Si la lías, hay un historial de versiones. Puedes volver a una versión anterior fácilmente desde el menú de opciones del documento.
3. **CORS y Autorización:** Si alguna vez entras desde un dispositivo nuevo o dominio nuevo y te sale el mensaje de "Connect this studio", simplemente haz clic en "Register this studio" para autorizar tu inicio de sesión.
4. **Imágenes:** El sistema optimiza automáticamente las imágenes, pero para que carguen lo más rápido posible, intenta subir fotos que no pesen más de 2-3 MB cada una.
