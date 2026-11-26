# Bitácora del Boletín Fotón-IA

Registro de lo decidido y lo construido, para que cualquier persona del equipo pueda continuar el trabajo.

**Estado al 25 de noviembre de 2026:** boletín n.º 1 completo. Los dos repositorios están en GitHub (cuenta `cahuba26`) y los medios ya están publicados en Render. Falta publicar el boletín en Render.

---

## 1. Objetivo

Boletín web interactivo para la **Junta de Acción Comunal Guanteros** (Belén Las Violetas, Comuna 16, Medellín) que cuente el proyecto **Plataforma Fotón-IA**: monitoreo inteligente de la quebrada La Picacha.

Es una actividad de **apropiación social del conocimiento**: la comunidad es actor fundamental del proyecto, se informa por aquí y hace veeduría.

**Instituciones:** Universidad de Medellín, Universidad Nacional de Colombia, Universidad de Antioquia, ITM. **Financia:** Ruta N (cuarta convocatoria G8+).

## 2. Decisiones tomadas

| Decisión | Por qué |
|---|---|
| Página web propia en lugar de Canva + Book Creator | Pasar de Canva a Book Creator convierte las páginas en imágenes y se pierde la interactividad. La web permite video, animaciones y un solo enlace para compartir. |
| Sitio estático (HTML, CSS y JavaScript, sin compilación) | Gratis de alojar, rápido en celulares, fácil de mantener. |
| Diseño primero para el celular (responsivo) | La comunidad lo abrirá desde el teléfono. Probado a 360, 390, 768 y 1280 px de ancho. |
| Aspecto de libro: portada, índice con páginas, capítulos con folio y barra inferior para pasar capítulos | Conservar la sensación de libro que se buscaba con Book Creator. |
| Colores verdes del material del proyecto (verde azulado `#0b5d55`, menta `#dff1ec`) y tipografías Figtree + Nunito Sans | Coherencia con las diapositivas del proyecto. |
| Lenguaje pedagógico, sin términos técnicos sin explicar | El público es la comunidad, no especialistas. |
| **No publicar presupuestos ni cronogramas** | Decisión del equipo: es apropiación social, no un informe técnico. |
| Mostrar logros: visita a la JAC, ponencias internacionales, prototipos | Generar confianza y orgullo en la comunidad. |
| Contar los resultados de energía en positivo ("seguimos explorando") | No presentar como fracaso un trabajo de exploración científica. |
| Imágenes y video fuera del repositorio del boletín | El repositorio queda solo con texto. Los medios viven en un segundo repositorio. |
| Medios en un segundo sitio estático en Render (no Cloudinary) | Cloudinary pedía pago. Render es gratis y se usa igual para el boletín. Se descartó jsDelivr porque sus condiciones prohíben usarlo para alojar medios y videos. |
| Números de versión `?v=` en los archivos de estilo y código | Evita que los celulares muestren una versión vieja guardada en memoria. |

## 3. Arquitectura

```
Repositorio 1: boletin-foton-ia        → Render → https://boletin-foton-ia.onrender.com        (textos, diseño, interactividad)
Repositorio 2: boletin-foton-ia-media  → Render → https://boletin-foton-ia-media.onrender.com  (28 imágenes y logos + video, ~5 MB)
```

- Los textos están en `public/index.html`.
- La dirección de los medios se configura en un solo archivo: `public/assets/js/config.js`.
- Si falta una imagen, la página muestra un recuadro rayado con su nombre, en vez de romperse.
- Para probar en el computador, `public/media/` tiene copia local de los medios (no se sube a GitHub).

Carpetas en el computador:

```
C:\Users\churt\Documents\Boletin_Foton_IA\
├── boletin-foton-ia\         ← repositorio 1
├── boletin-foton-ia-media\   ← repositorio 2
├── Informes_Mensuales\       ← fuentes (informes 1 a 6, .md y .pdf)
├── Logos\                    ← logos originales
├── Anexo 2 ... .md / .pdf    ← ficha del proyecto
└── Alerta_Tempranas_UNAL_Video.mp4  ← video original
```

## 4. Contenido actual (13 capítulos)

| # | Capítulo | Interactividad |
|---|---|---|
| Portada | Cuidando juntos la quebrada La Picacha | Agua que corre; celular con datos que cambian de Bien a Atención y Alerta. Mismo ancho que las páginas; probada a 360, 390, 768, 1024 y 1440 px |
| 1 | Una carta para la comunidad | — |
| 2 | La Picacha, nuestra quebrada | — |
| 3 | ¿Por qué medir todo el día? | Comparador: una muestra al día vs. medir todo el tiempo |
| 4 | Así funciona el sensor de luz | Video con 6 pasos tocables; anillo animado; fotos de chips reales |
| 5 | Del agua a su celular | Animaciones del anillo del chip y de la fibra óptica; glosario de tarjetas |
| 6 | Una app para la comunidad | Pantallas del prototipo deslizables; estado de cada función |
| 7 | Nuestro encuentro con la JAC | Fotos de la visita, acuerdos y dibujo de los tres puntos |
| 8 | La Picacha llega al mundo | Recorrido Medellín → Francia → Nueva York → en línea → Bogotá; mural de fotos de congresos |
| 9 | Así trabajamos | Galería por temas con foto ampliable |
| 10 | Buscando energía en el agua | Recorrido de 4 pasos |
| 11 | Quiénes hacemos Fotón-IA | Solo logos y nombres: universidades, Ruta N y aliados internacionales |
| 12 | Lo que sigue | Línea de tiempo sobre un río animado, sin fechas |
| 13 | Su papel en la veeduría | Lista de preguntas que se guarda en el celular |

Las animaciones se detienen si el celular tiene activada la opción de reducir movimiento.

## 5. Historial de versiones

| Versión | Fecha | Cambios |
|---|---|---|
| v1 | 25 nov 2026 | Primera versión: 10 capítulos, portada ilustrada, video, galería, veeduría. |
| v2 | 25 nov 2026 | Reestructura como sitio estático para GitHub + Render; medios por URL; documentación; capítulos del sensor de luz (video por pasos) y de la app. |
| v3 | 25 nov 2026 | Logos; sin presupuesto ni cronogramas; lenguaje más sencillo; capítulos "Nuestro encuentro con la JAC" y "La Picacha llega al mundo". |
| v7 | 25 nov 2026 | Logos de aliados internacionales (BSU, C2N, Toulouse); se retira MIT. |
| v6 | 25 nov 2026 | Foto del chip de nitruro de silicio (cap. 4); mural de fotos de congresos y póster del ITM (cap. 8); "Quiénes hacemos" solo con logos y nombres, con Ruta N y aliados internacionales aparte; nuevo texto de la fibra óptica; portada del mismo ancho que las páginas y sin recuadro de datos; galería con pestaña "Congresos". |
| v5 | 25 nov 2026 | Repositorios en GitHub; medios publicados en Render; `config.js` apunta al sitio de medios. |
| v4 | 25 nov 2026 | Medios en un segundo repositorio en Render. Portada animada; se quita "¿Cómo vamos?"; "Lo que sigue" sobre un río animado; capítulo de energía en positivo; animaciones del anillo y la fibra óptica; números de versión para evitar memoria vieja. |

## 6. Pendientes

**Antes de publicar:**

- [x] Crear los dos repositorios en GitHub: `cahuba26/boletin-foton-ia-media` y `cahuba26/boletin-foton-ia`.
- [x] Publicar los medios en Render: https://boletin-foton-ia-media.onrender.com
- [x] Poner la dirección de los medios en `config.js`.
- [ ] Publicar el boletín en Render (Blueprint de `cahuba26/boletin-foton-ia`).
- [x] Trabajos de LAOP (Bogotá) presentados: confirmado con la foto de la charla.
- [x] Logos de los aliados internacionales: Bridgewater State University, C2N y Universidad de Toulouse (MIT no se incluye, por decisión del equipo).
- [ ] Subir las fotos y logos nuevos al repositorio de medios (`git push` en `boletin-foton-ia-media`).
- [ ] Confirmar el correo de contacto publicado.
- [ ] Confirmar la autorización de las personas en las fotos de la visita.
- [ ] Que la UNAL revise la explicación del video (capítulo 4).

**Contenido por agregar:**

- [x] Foto adicional del chip de nitruro de silicio.
- [ ] Logo de la JAC Guanteros, si existe.
- [ ] Información adicional que indique el equipo.

**En evaluación:**

- [ ] Efecto de libro (pasar páginas). Ver la sección 7.

## 7. Evaluación: efecto de libro tipo Book Creator

Resumen: un pase de página realista con hojas de tamaño fijo choca con la responsividad, el video y las animaciones. Se recomienda una opción intermedia que da la sensación de libro sin romper nada. Pendiente de decisión del equipo.

| Opción | Cómo se ve | Celular | Video e interactivos | Esfuerzo |
|---|---|---|---|---|
| A. Pase de página realista (hoja que se dobla, librerías tipo StPageFlip o turn.js) | Como un libro físico | Difícil: páginas de tamaño fijo; en pantallas pequeñas el texto se achica o hay que partir cada capítulo en muchas hojas | Choques entre deslizar para pasar hoja y usar galería, video o mapa | Alto |
| B. Libro por capítulos (recomendada) | Portada que se abre como tapa; cada capítulo es una hoja que entra con giro 3D; se pasa deslizando a los lados o con las flechas; dentro del capítulo se baja normal | Se mantiene responsivo | Todo sigue funcionando | Medio |
| C. Lo actual + detalles de libro | Desplazamiento vertical, con portada que se abre y animación de hoja al usar las flechas | Se mantiene responsivo | Todo sigue funcionando | Bajo |
