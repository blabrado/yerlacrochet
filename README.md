# Yerla · Hilos de amor — Sitio web

Sitio estático (HTML5 + CSS3 + JavaScript ES6+), sin frameworks ni instalación. Pensado sobre todo para **celular**.

## 1. Cómo abrirlo
Haz doble clic en `index.html`. No necesita servidor. (Las tipografías Fredoka y Questrial se cargan desde Google Fonts, así que se ven mejor con internet.)

## 2. PENDIENTES por confirmar con la cliente
Nada de esto se inventó. Está marcado para completarlo:

| Dato | Dónde se cambia | Qué pasa mientras falte |
|---|---|---|
| **Número de WhatsApp** | `js/config.js` → `whatsapp` (ej. `"573001234567"`) | Los botones abren WhatsApp sin destinatario; la página de contacto muestra "Pendiente de confirmar". |
| **Correo** | `js/config.js` → `email` | El botón "Enviar email" queda desactivado con insignia de pendiente. |
| **Instagram** | `js/config.js` → `instagram` (enlace completo) | Se oculta en el pie; en contacto aparece como pendiente. |
| **Logo en alta calidad (PNG/SVG)** | Reemplazar `assets/logos/yerla-logo.png` (y `favicon.png`, `apple-touch-icon.png`) | Hoy es un recorte del logo del brief (153 px): se ve borroso en pantallas grandes. |
| **Tipografía de títulos "29LT Riwayana"** | Variable `--font-title` en `css/styles.css` | Es de pago y no está en Google Fonts; se usa **Fredoka** como sustituta. |
| **Descripciones y nombres oficiales de productos** | `js/productos.js` | Hoy describen lo que se ve en cada foto. |
| **Fotos reales de los 30+ artículos** | `assets/images/` + `js/productos.js` | Hoy hay 14 fotos de ejemplo del brief. |
| **Dominio** | Reemplazar `TU-DOMINIO.com` en `sitemap.xml`, `robots.txt`, y en las etiquetas `og:` y datos estructurados de cada `.html` | Open Graph y sitemap no funcionarán hasta entonces. |
| **Testimonios reales** | `nosotros.html` (busca `PENDIENTE`) | Hoy hay un resumen de lo que dicen las reseñas, sin nombres ni citas inventadas. |
| **Nombre de la creadora** | — | El brief la nombra "Jessica", "Yesica" y "Yessica". Por eso el sitio no usa su nombre. |
| **Precios, medidas y tiempos exactos** | `personaliza.html` (preguntas frecuentes) | No hay precios en el brief; el sitio dice que se conversan por WhatsApp. |

## 3. Cómo agregar un artículo nuevo al catálogo
1. Guarda la foto en `assets/images/` (JPG, ideal ≤ 1000 px de ancho). Usa un nombre descriptivo: `aretes-luna-mostacilla.jpg`.
2. Abre `js/productos.js`, copia un bloque `{ ... }` de la lista `YERLA_PRODUCTOS` y cambia `id`, `nombre`, `grupo`, `categoria`, `imagen`, `ancho`, `alto`, `alt` y `descripcion`.
3. Guarda. La tarjeta aparece sola, con su filtro, su ventana ampliada y su botón de pedido por WhatsApp.

Las categorías de la salida de baño (`salidas`) todavía no tienen piezas: esa pestaña muestra un mensaje invitando a pedirla por WhatsApp, en lugar de quedar vacía.

## 4. Estructura
```
yerla-web/
├── index.html          Inicio (hero con carrusel, muestra, categorías, cifras, historia)
├── accesorios.html     Catálogo: Todo · Manillas · Aretes · Llaveros
├── prendas.html        Catálogo: Todo · Salidas de baño · Trajes de baño · Blusas y crop tops · Gorros
├── personaliza.html    Cómo personalizar, formulario → WhatsApp, preguntas frecuentes
├── nosotros.html       Historia, propósito, cifras, lo que dicen de Yerla
├── contacto.html       WhatsApp, email, Instagram, cómo atendemos
├── css/styles.css
├── js/config.js        Datos de contacto (editar aquí)
├── js/productos.js     Catálogo (editar aquí)
├── js/main.js          Menú, carrusel, filtros, galería, formulario, animaciones
├── assets/{images,logos,icons}
├── robots.txt
└── sitemap.xml
```
Los filtros se pueden enlazar directamente: `accesorios.html?cat=aretes`, `prendas.html?cat=gorros`, etc.

## 5. Qué funciona "de verdad" (y qué no)
- **Funciona sin servidor:** menú, carrusel (con pausa), filtros, galería ampliada, preguntas frecuentes, contadores, validación del formulario y botones de WhatsApp.
- **El formulario de "Personaliza" no envía datos a ningún servidor.** Solo arma el mensaje y abre WhatsApp (`wa.me`). La foto de referencia la adjunta la persona en el chat.
- **Correo:** el botón "Enviar email" usa `mailto:`; abre el programa de correo de la persona.
- No hay carrito, pagos ni cuentas: el brief pide un catálogo conceptual que lleve a WhatsApp.

## 6. Publicar (hosting estático gratuito)
Sube la carpeta completa a **Netlify Drop**, **GitHub Pages** o **Cloudflare Pages**. Mantén la estructura de carpetas. Luego actualiza el dominio (punto 2).

## 7. Accesibilidad y rendimiento
Enlace "Saltar al contenido", navegación por teclado, `aria-*` en menú/carrusel/filtros, `prefers-reduced-motion` respetado, contraste revisado (blanco sobre morado `#7C05F2` ≈ 6.6:1; texto oscuro sobre fucsia), imágenes con `alt`, `width/height` y carga diferida, sin librerías externas salvo las tipografías.
