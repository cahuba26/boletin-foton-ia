/* =====================================================================
   CONFIGURACIÓN DE MEDIOS (imágenes y video) — Boletín Fotón-IA
   ---------------------------------------------------------------------
   Las imágenes y el video NO están en este repositorio. Viven en un
   segundo repositorio, "boletin-foton-ia-media", que Render publica
   gratis como sitio estático. El navegador del visitante los descarga
   desde esa dirección.

   Este es el ÚNICO archivo que hay que tocar para cambiar medios.
   Guía paso a paso: docs/GUIA_MEDIOS.md
   ===================================================================== */

window.FOTONIA_CONFIG = {

  /* 1) Dirección donde están las imágenes (termina en "/").
     - Para probar en su computador:  "media/"
     - En internet (cuando publique el repositorio de medios en Render):
       "https://boletin-foton-ia-media.onrender.com/"
       (use la dirección exacta que le asigne Render) */
  MEDIA_BASE: "media/",

  /* 2) Extensión de las imágenes. */
  EXTENSION: ".jpg",

  /* 3) Video del sensor de luz. Use UNA de las dos opciones:
     - mp4: dirección del archivo. En internet:
       "https://boletin-foton-ia-media.onrender.com/sensor-fotonico.mp4"
     - youtube: solo el código del video (lo que va después de "v=").
     Si llena las dos, se usa mp4. */
  VIDEO: {
    mp4: "media/sensor-fotonico.mp4",
    youtube: "",
    portada: "video-portada"   // imagen que se ve antes de darle play
  },

  /* 4) (Opcional) Dirección completa para una imagen específica,
     si alguna está alojada en otro lugar.
     Ejemplo:  "chip-moneda": "https://otro-sitio.com/chip.jpg" */
  OVERRIDES: {
  }
};
