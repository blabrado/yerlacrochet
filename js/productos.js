/* ==========================================================
   YERLA · Catálogo de productos (datos)
   Para AGREGAR un artículo nuevo:
   1) Sube la foto a assets/images/ (ideal: JPG, máx. 1000 px de ancho).
   2) Copia un bloque { ... } de la lista y cambia sus datos.
   3) Guarda. La tarjeta aparece sola en el catálogo, con su filtro.

   grupo:     "accesorios" | "prendas"
   categoria: accesorios -> "manillas" | "aretes" | "llaveros" | "otros"
              prendas    -> "salidas" | "trajes" | "blusas" | "gorros"
              ("otros" solo aparece en "Todo")

   NOTA: los nombres y descripciones de abajo describen lo que se ve en la foto.
   PENDIENTE: reemplazarlos por las descripciones oficiales que entregue la cliente.
   No se muestran precios porque no hay precios definidos en el brief.
   ========================================================== */

window.YERLA_CATEGORIAS = {
  accesorios: {
    titulo: "Accesorios",
    filtros: [
      { id: "manillas", label: "Manillas", singular: "manillas" },
      { id: "aretes", label: "Aretes", singular: "aretes" },
      { id: "llaveros", label: "Llaveros", singular: "llaveros" }
    ]
  },
  prendas: {
    titulo: "Prendas",
    filtros: [
      { id: "salidas", label: "Salidas de baño", singular: "salidas de baño" },
      { id: "trajes", label: "Trajes de baño", singular: "trajes de baño" },
      { id: "blusas", label: "Blusas y crop tops", singular: "blusas y crop tops" },
      { id: "gorros", label: "Gorros", singular: "gorros" }
    ]
  }
};

window.YERLA_PRODUCTOS = [
  {
    id: "aretes-girasol",
    nombre: "Aretes girasol",
    grupo: "accesorios",
    categoria: "aretes",
    imagen: "assets/images/aretes-girasol-mostacilla.jpg",
    ancho: 500, alto: 376,
    alt: "Aretes tejidos en mostacilla con forma de girasol amarillo y flecos negros y naranjas",
    descripcion: "Aretes tejidos en mostacilla con flor de girasol y flecos de colores."
  },
  {
    id: "aretes-cerezas",
    nombre: "Aretes cerezas",
    grupo: "accesorios",
    categoria: "aretes",
    imagen: "assets/images/aretes-cerezas-mostacilla.jpg",
    ancho: 415, alto: 311,
    alt: "Aretes tejidos en mostacilla con forma de par de cerezas rojas con hojas verdes",
    descripcion: "Aretes de cerezas tejidos en mostacilla roja y verde."
  },
  {
    id: "aretes-flecos-amarillos",
    nombre: "Aretes flecos amarillos",
    grupo: "accesorios",
    categoria: "aretes",
    imagen: "assets/images/aretes-flecos-amarillos-mostacilla.jpg",
    ancho: 419, alto: 314,
    alt: "Aretes largos de flecos en mostacilla amarilla con un diseño azul",
    descripcion: "Aretes largos de flecos en mostacilla amarilla con detalle azul."
  },
  {
    id: "aretes-flores-rosadas",
    nombre: "Aretes flores rosadas",
    grupo: "accesorios",
    categoria: "aretes",
    imagen: "assets/images/aretes-flores-rosadas-mostacilla.jpg",
    ancho: 426, alto: 319,
    alt: "Aretes largos de mostacilla blanca con pequeñas flores rosadas",
    descripcion: "Aretes largos en mostacilla blanca con florecitas rosadas."
  },
  {
    id: "manilla-girasol",
    nombre: "Manilla girasol",
    grupo: "accesorios",
    categoria: "manillas",
    imagen: "assets/images/manilla-girasol-mostacilla.jpg",
    ancho: 375, alto: 320,
    alt: "Manilla ancha tejida en mostacilla con girasoles sobre fondo azul turquesa",
    descripcion: "Manilla ancha en mostacilla con diseño de girasoles."
  },
  {
    id: "manillas-corazon",
    nombre: "Manillas corazón",
    grupo: "accesorios",
    categoria: "manillas",
    imagen: "assets/images/manillas-corazon-negra-y-blanca.jpg",
    ancho: 477, alto: 318,
    alt: "Dos manillas tejidas en mostacilla, una negra y una blanca, con pequeños corazones rojos",
    descripcion: "Manillas en mostacilla, en versión negra y blanca, con corazones rojos."
  },
  {
    id: "pulsera-hojas",
    nombre: "Pulsera de hojas",
    grupo: "accesorios",
    categoria: "manillas",
    imagen: "assets/images/pulsera-hojas-mostacilla.jpg",
    ancho: 419, alto: 183,
    alt: "Pulsera tejida en mostacilla negra con hojas verdes sobre una mesa de madera",
    descripcion: "Pulsera en mostacilla negra con hojas verdes."
  },
  {
    id: "manillas-variadas",
    nombre: "Manillas variadas",
    grupo: "accesorios",
    categoria: "manillas",
    imagen: "assets/images/manillas-coleccion-variada.jpg",
    ancho: 409, alto: 307,
    alt: "Colección de manillas y accesorios tejidos en cartulinas de presentación rosadas",
    descripcion: "Una muestra de manillas de distintos colores y diseños."
  },
  {
    id: "llavero-mono",
    nombre: "Llavero moño rosado",
    grupo: "accesorios",
    categoria: "llaveros",
    imagen: "assets/images/llavero-mono-crochet-rosado.jpg",
    ancho: 422, alto: 317,
    alt: "Llavero con un moño tejido en crochet rosado sobre una superficie peluda blanca",
    descripcion: "Llavero con moño tejido en crochet rosado."
  },
  {
    id: "mochila-crochet",
    nombre: "Mochila en crochet",
    grupo: "accesorios",
    categoria: "otros",
    imagen: "assets/images/mochila-crochet-estampada.jpg",
    ancho: 330, alto: 268,
    alt: "Mochila pequeña tejida en crochet con hilo de tonos verdes y blancos",
    descripcion: "Mochila pequeña tejida en crochet."
  },
  {
    id: "top-arcoiris",
    nombre: "Top arcoíris",
    grupo: "prendas",
    categoria: "blusas",
    imagen: "assets/images/top-crochet-arcoiris.jpg",
    ancho: 418, alto: 314,
    alt: "Top de crochet a rayas de colores del arcoíris, visto de frente y de espalda",
    descripcion: "Top de crochet a rayas multicolor, con amarre en la espalda."
  },
  {
    id: "top-negro",
    nombre: "Top negro acanalado",
    grupo: "prendas",
    categoria: "blusas",
    imagen: "assets/images/top-crochet-negro-acanalado.jpg",
    ancho: 396, alto: 297,
    alt: "Top negro de punto acanalado con tiras para amarrar",
    descripcion: "Top tejido en punto acanalado negro con tiras para amarrar."
  },
  {
    id: "gorro-amarillo",
    nombre: "Gorro amarillo",
    grupo: "prendas",
    categoria: "gorros",
    imagen: "assets/images/gorro-sombrero-crochet-amarillo.jpg",
    ancho: 370, alto: 316,
    alt: "Gorro tipo sombrero tejido en crochet amarillo con una cinta roja",
    descripcion: "Gorro tipo sombrero en crochet amarillo con cinta roja."
  },
  {
    id: "traje-azul",
    nombre: "Traje de baño azul",
    grupo: "prendas",
    categoria: "trajes",
    imagen: "assets/images/traje-de-bano-crochet-azul.jpg",
    ancho: 421, alto: 316,
    alt: "Traje de baño de crochet azul oscuro con detalles circulares calados",
    descripcion: "Traje de baño en crochet azul oscuro con detalles calados."
  }
];
