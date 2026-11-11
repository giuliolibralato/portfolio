# Cursores (estilo multiplayer de Figma)

| Archivo | Cuándo | Hotspot (x y) |
|---|---|---|
| pointer.svg | Espacio vacío | 2 2 |
| link.svg | Links, botones, tarjetas | 7 2 |
| text.svg | Párrafos y títulos | 7 8 |
| grab.svg | Pila de visual (arrastrable) | 10 5 |

- Color base `#007AFF`. Para los otros colores del menú, cambia el `fill`/`stroke` azul por: morado `#7C3AED`, rosa `#DB2777`, naranja `#EA580C`, verde `#16A34A`, grafito `#334155`.
- Borde blanco de 1.5 px y sombra suave incluidos.
- La etiqueta ("visitor" / "visitante") no va en el SVG: es un elemento HTML que sigue al cursor, 15 px a la derecha y 18 px abajo de la punta, radio 4 px, padding 2 × 7 px, texto blanco 12/16 500.
- Uso como cursor nativo: `cursor: url(/cursors/pointer.svg) 3 3, auto;`. Para el color elegido por el visitante conviene el cursor dibujado en HTML (como en el canvas), porque `cursor: url()` no cambia de color.
