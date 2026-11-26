# Guía de contenido: cómo editar el boletín

No se necesita saber programar. Los textos están en español, en orden, dentro de `public/index.html`. Use un editor de texto como **Visual Studio Code** (gratuito).

## Principios de redacción

El público es la comunidad de la JAC Guanteros, no especialistas.

- Frases cortas. Una idea por frase.
- Sin siglas sin explicar. Si aparece una palabra técnica, agréguela al glosario (capítulo 4).
- Contar también lo que no salió bien (como en el capítulo 9): eso da confianza para la veeduría.
- **No incluir presupuestos ni cronogramas** (ni cifras de dinero ni fechas futuras). Es una actividad de apropiación social, no un informe técnico.
- Sí contar logros: encuentros con la comunidad, ponencias internacionales, prototipos.

## Dónde está cada cosa

| Quiero cambiar... | Archivo | Busque |
|---|---|---|
| Un texto de cualquier capítulo | `public/index.html` | `CAPÍTULO 5` (o el número) |
| El título de un capítulo en el índice | `public/index.html` | `data-t="..."` de esa sección |
| Lo que sigue (río) | `public/index.html` | `class="river"` |
| Lo que acordamos con la JAC | `public/index.html` | `class="agree"` |
| Las ponencias internacionales | `public/index.html` | `class="world"` |
| El estado de un frente (Cumplido, En curso…) | `public/index.html` | `class="status"` |
| Las palabras del glosario | `public/assets/js/main.js` | `const glosario` |
| Los pasos y segundos del video | `public/assets/js/main.js` | `const pasos` |
| Las fotos de la galería | `public/assets/js/main.js` | `const galeria` |
| Las preguntas de veeduría | `public/assets/js/main.js` | `const preguntas` |
| Fotos y video | `public/assets/js/config.js` | ver `GUIA_MEDIOS.md` |
| Colores | `public/assets/css/styles.css` | `:root` al inicio |

> **Importante:** si cambia `styles.css`, `config.js` o `main.js`, suba el número `?v=4` (a `?v=5`, `?v=6`...) donde `index.html` carga esos archivos. Así los celulares no muestran la versión vieja guardada en memoria.

El índice y los números de página se generan solos a partir de los capítulos.

## Etiquetas de estado (capítulo 6)

```html
<span class="pill ok">Ya funciona en prueba</span>  <!-- verde -->
<span class="pill go">En construcción</span>        <!-- menta -->
<span class="pill next">Con ustedes</span>          <!-- coral -->
```

## Lo que sigue (capítulo 12, río animado)

Cada parada es una línea dentro de `<div class="river">`. Para agregar o quitar una, copie o borre un `<li>` y ajuste el número de `<span class="st">`. Si cambia la cantidad de paradas, cambie también `repeat(5,` en la regla `.river ol` de `styles.css`. No se ponen fechas.

## Agregar una ponencia o un encuentro

Ponencia: copie una línea dentro de `<ol class="world">` (capítulo 8):

```html
<li><span class="pin">Lima</span><div><b>Ponencia en el congreso X</b><p>Qué contamos, en una frase sencilla.</p></div></li>
```

Acuerdo con la comunidad: copie un bloque dentro de `<div class="agree">` (capítulo 7).

## Agregar un capítulo

Copie un bloque completo `<section class="page" id="c9" ...> ... </section>`, cámbiele el `id` (por ejemplo `c13`), el `data-t` y el número en `<span class="chap">`. Aparece solo en el índice y en la barra inferior.

## Hacer el boletín n.º 2

1. Cree una rama: `git checkout -b boletin-2`.
2. Cambie “Boletín n.º 1 · noviembre de 2026” en `index.html` (aparece en el encabezado, la portada y el pie de cada página: use Buscar y reemplazar).
3. Actualice los capítulos 6, 7, 8 y 11 con el nuevo informe mensual.
4. En `main.js`, cambie `fotonia-veeduria-n1` por `fotonia-veeduria-n2` para que la lista de veeduría empiece limpia.
5. Revise con la checklist de `DESPLIEGUE_RENDER.md` y una la rama a `main`.

Si quiere conservar el n.º 1 en línea, copie `public/index.html` a `public/n1.html` antes de editar.

## Logos

Los logos están en el capítulo 11 y en el pie de página. Cada uno es una tarjeta con logo y nombre:

```html
<figure class="lgcard"><img data-media="logo-c2n" data-fallback="name" alt="C2N"><figcaption>Centro de Nanociencias y Nanotecnologías (C2N)</figcaption></figure>
```

Si el archivo del logo todavía no está en el repositorio de medios, la tarjeta muestra el nombre en un recuadro, sin romperse. Para agregarlo, súbalo al repositorio `boletin-foton-ia-media` con el nombre exacto (por ejemplo `logo-c2n.jpg`).
