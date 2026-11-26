# Boletín Fotón-IA

Boletín web interactivo para la **Junta de Acción Comunal Guanteros** (Belén Las Violetas, Comuna 16, Medellín) sobre el proyecto **Plataforma Fotón-IA: monitoreo inteligente de la quebrada La Picacha**.

Proyecto de la Universidad de Medellín, la Universidad Nacional de Colombia, la Universidad de Antioquia y el ITM, financiado por Ruta N (cuarta convocatoria G8+).

- Se lee como un libro: portada, índice y 12 capítulos.
- Pensado primero para el celular; se ajusta a cualquier pantalla.
- Es un sitio **estático**: solo HTML, CSS y JavaScript. No necesita servidor, base de datos ni compilación.
- **Las imágenes y el video no están en este repositorio.** Viven en un segundo repositorio, `boletin-foton-ia-media`, que Render publica gratis; el navegador de cada visitante los descarga por URL.

---

## Estructura

```
boletin-foton-ia/
├── public/                  ← lo único que se publica en Render
│   ├── index.html           ← TODOS los textos del boletín
│   ├── assets/
│   │   ├── css/styles.css   ← colores, tipografía y diseño
│   │   ├── js/config.js     ← URLs de imágenes y video (único archivo de medios)
│   │   ├── js/main.js       ← interactividad (índice, video por pasos, galería...)
│   │   └── favicon.svg
│   └── media/               ← SOLO en su computador (ignorada por Git)
├── docs/
│   ├── BITACORA.md          ← decisiones, historial de versiones y pendientes (empiece aquí)
│   ├── GUIA_MEDIOS.md       ← publicar fotos y video gratis y conectarlos
│   ├── GUIA_CONTENIDO.md    ← cambiar textos, fotos, preguntas; hacer el boletín n.º 2
│   ├── DESPLIEGUE_RENDER.md ← GitHub → Render, paso a paso
│   ├── INVENTARIO_MEDIOS.md ← lista de cada imagen, de dónde salió y dónde se usa
│   └── FUENTES_Y_PENDIENTES.md ← de qué informe sale cada dato y qué confirmar
├── render.yaml              ← configuración de Render
└── .gitignore               ← impide subir imágenes y videos
```

## Flujo de trabajo

```
 1. Editar textos ............ public/index.html
 2. Subir fotos/video ........ repositorio boletin-foton-ia-media  →  dirección en public/assets/js/config.js
 3. Probar en su computador .. ver "Probar localmente"
 4. Guardar cambios .......... git add . && git commit -m "..." && git push
 5. Publicar ................. Render actualiza la URL solo, en 1–2 minutos
```

## Probar localmente

1. La carpeta `public/media/` ya trae las imágenes y el video (no se sube a GitHub).
2. En una terminal, dentro de la carpeta `public`:

   ```bash
   python -m http.server 8000
   ```

3. Abra `http://localhost:8000` en el navegador. Para verlo como celular, use las herramientas de desarrollador (F12 → icono de teléfono).

> Abrir `index.html` con doble clic también funciona en la mayoría de navegadores, pero el servidor local se comporta igual que Render.

Mientras `config.js` tenga `MEDIA_BASE: "media/"`, el sitio usa la carpeta local. En producción se cambia por la dirección del sitio de medios en Render (ver `docs/GUIA_MEDIOS.md`). Si una imagen no se encuentra, el sitio muestra un recuadro rayado con el nombre que falta, en vez de romperse.

## Capítulos

| # | Capítulo | Qué tiene |
|---|----------|-----------|
| Portada | Ilustración viva | La quebrada corre y el celular muestra datos que cambian |
| 1 | Una carta para la comunidad | Saludo y propósito del boletín |
| 2 | La Picacha, nuestra quebrada | El problema y las tres preguntas sin respuesta |
| 3 | ¿Por qué medir todo el día? | Interactivo: una muestra al día vs. medir todo el tiempo |
| 4 | Así funciona el sensor de luz | Video con 6 pasos tocables y el anillo explicado como una pista |
| 5 | Del agua a su celular | Medir (con animaciones del anillo y la fibra óptica) → Enviar → Analizar → Avisar; glosario |
| 6 | Una app para la comunidad | Pantallas del prototipo, **simulador del semáforo del agua** (turbiedad, pH, plomo y oxígeno) y cómo va cada función |
| 7 | Nuestro encuentro con la JAC | Fotos de la visita, lo que acordamos y los tres puntos |
| 8 | La Picacha llega al mundo | Ponencias y pósteres internacionales |
| 9 | Así trabajamos | Galería por temas |
| 10 | Buscando energía en el agua | Muestras, laboratorio y la exploración que sigue |
| 11 | Quiénes hacemos Fotón-IA | Instituciones con sus logos, JAC y Ruta N |
| 12 | Lo que sigue | Próximas paradas sobre un río animado, sin fechas |
| 13 | Su papel en la veeduría | Lista de preguntas que se guarda en el celular |
| 14 | Su opinión cuenta | Formulario de evaluación de la capacitación (Google Forms): botón y opción de responder dentro del boletín |

## Línea editorial

Este boletín es una actividad de **apropiación social del conocimiento** con la comunidad:

- Lenguaje sencillo y pedagógico; nada de términos técnicos sin explicar.
- **No se publican presupuestos ni cronogramas.**
- Sí se muestran los logros: la visita con la JAC, las ponencias internacionales, los prototipos.

## Tecnología usada

- HTML, CSS y JavaScript sin librerías ni compilación.
- Tipografías Figtree y Nunito Sans (Google Fonts).
- Imágenes y video: segundo sitio estático en Render (o video en YouTube, opcional).
- Hospedaje: Render, sitio estático gratuito.
