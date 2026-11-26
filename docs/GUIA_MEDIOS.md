# Guía de medios: imágenes y video

Las imágenes y el video **no van en el repositorio del boletín**. Van en un segundo repositorio, `boletin-foton-ia-media`, que Render publica gratis como sitio estático. El boletín los carga desde esa dirección.

```
Repositorio 1: boletin-foton-ia        → https://boletin-foton-ia.onrender.com        (textos y diseño)
Repositorio 2: boletin-foton-ia-media  → https://boletin-foton-ia-media.onrender.com  (fotos, logos, video)
```

Ventajas:

- Gratis, con las mismas dos herramientas (GitHub y Render). No hay que crear cuentas en otro servicio.
- El repositorio del boletín queda solo con texto.
- Para cambiar una foto no se toca el código: se reemplaza el archivo en el repositorio de medios con el mismo nombre.

Todo se conecta en **un solo archivo**: `public/assets/js/config.js`.

---

## 1. Subir el repositorio de medios a GitHub

La carpeta `boletin-foton-ia-media` ya tiene las 28 imágenes y el video optimizados, un `render.yaml` y un `README.md`.

1. En GitHub cree un repositorio **público** vacío llamado `boletin-foton-ia-media`.
2. En una terminal, dentro de la carpeta `boletin-foton-ia-media`:

```bash
git init
git add .
git commit -m "Medios del boletín n.º 1"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/boletin-foton-ia-media.git
git push -u origin main
```

> También puede arrastrar los archivos en la página de GitHub (botón **Add file → Upload files**). Pesan unos 5 MB en total.

## 2. Publicarlo en Render

1. En https://render.com: **New → Blueprint** → elija `boletin-foton-ia-media` → **Apply**.
   (O **New → Static Site**, con *Publish Directory* `.` y *Build Command* vacío.)
2. Render le da una dirección, por ejemplo `https://boletin-foton-ia-media.onrender.com`.
3. Compruebe que funciona abriendo `https://boletin-foton-ia-media.onrender.com/chip-moneda.jpg` en el navegador.

## 3. Conectar el boletín

En `public/assets/js/config.js` del repositorio del boletín cambie tres líneas (use su dirección exacta):

```js
MEDIA_BASE: "https://boletin-foton-ia-media.onrender.com/",
EXTENSION: ".jpg",
VIDEO: {
  mp4: "https://boletin-foton-ia-media.onrender.com/sensor-fotonico.mp4",
  youtube: "",
  portada: "video-portada"
},
```

Guarde, haga `git push` del boletín y Render lo actualiza.

## 4. Verificar

Abra el boletín en el celular y recorra los capítulos. Si aparece un **recuadro rayado** con el texto “Imagen pendiente: nombre”, ese archivo no está en el repositorio de medios o tiene otro nombre.

## Opción para el video: YouTube

Si prefiere, suba el video a YouTube como **No listado** y en `config.js` deje `mp4: ""` y ponga el código del video en `youtube` (lo que va después de `v=` en el enlace). Con YouTube, al tocar un paso del capítulo 4 el video se recarga desde ese segundo.

## Agregar o cambiar una imagen

- **Reemplazar:** suba al repositorio de medios un archivo con el mismo nombre y haga `git push`. El navegador puede tardar hasta un día en mostrar la nueva versión por la memoria caché; para verla de inmediato, use un nombre nuevo (por ejemplo `chip-moneda-2`) y cámbielo en `index.html`.
- **Nueva:** súbala con un nombre corto en minúsculas y con guiones (por ejemplo `taller-vigias-1.jpg`) y úsela en `index.html`:

```html
<figure class="photo">
  <img data-media="taller-vigias-1" alt="Descripción para quien no ve la imagen" data-cap="Pie de foto al ampliarla">
  <figcaption>Pie de foto visible.</figcaption>
</figure>
```

Para la galería del capítulo 10, agréguela en la lista `galeria` de `public/assets/js/main.js`.

## Recomendaciones para fotos nuevas

- JPG de máximo 1600 px en el lado mayor y menos de 400 KB.
- Fotos horizontales para la galería (se recortan a 4:3).
- Pida autorización a las personas que aparecen en las fotos de la comunidad.

## Otras opciones

Cualquier servicio que entregue una dirección pública por archivo sirve (por ejemplo, el plan gratuito de Cloudinary). Solo cambie `MEDIA_BASE` y `VIDEO.mp4`.
