# Despliegue: GitHub → Render

Son dos sitios gratuitos: primero el de **medios** (ver `GUIA_MEDIOS.md`) y luego el **boletín**.

Resultado: una URL pública, por ejemplo `https://boletin-foton-ia.onrender.com`, que se actualiza sola con cada `git push`.

## 1. Subir el proyecto a GitHub

Con Git instalado, en la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Boletín Fotón-IA n.º 1"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/boletin-foton-ia.git
git push -u origin main
```

(Cree antes el repositorio vacío `boletin-foton-ia` en GitHub. Puede ser público o privado.)

Revise en GitHub que **no** se subió la carpeta `public/media/` ni ningún `.jpg` o `.mp4`. El archivo `.gitignore` lo impide.

## 2. Crear el sitio en Render

**Opción A, con el archivo `render.yaml` (más rápida):**

1. Entre a https://render.com con su cuenta de GitHub.
2. **New → Blueprint** y elija el repositorio `boletin-foton-ia`.
3. Render lee `render.yaml` y crea el sitio. Confirme con **Apply**.

**Opción B, manual:**

1. **New → Static Site** y elija el repositorio.
2. Llene así:
   - **Name:** `boletin-foton-ia`
   - **Branch:** `main`
   - **Build Command:** déjelo vacío (o `echo ok`)
   - **Publish Directory:** `public`
3. **Create Static Site**.

En 1–2 minutos Render muestra la URL. Esa es la que se comparte con la JAC, por WhatsApp o con un código QR.

## 3. Actualizar el boletín

Cada vez que haga cambios:

```bash
git add .
git commit -m "Describa el cambio"
git push
```

Render publica la nueva versión automáticamente.

## 4. Dominio propio (opcional)

En Render: **Settings → Custom Domains**, agregue por ejemplo `boletin.fotonia.co` y siga las instrucciones de DNS de su proveedor de dominio.

## Lista de verificación antes de compartir

- [ ] El sitio de medios está publicado y `config.js` apunta a su dirección (no a `media/`).
- [ ] Todas las fotos cargan en el celular (ningún recuadro rayado).
- [ ] El video se reproduce y los 6 pasos saltan al momento correcto.
- [ ] Revisados los puntos de `docs/FUENTES_Y_PENDIENTES.md`.
- [ ] Logos de las instituciones agregados (cuando estén disponibles).
- [ ] Probado en al menos un Android y un iPhone.
