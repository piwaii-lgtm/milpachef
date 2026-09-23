# Restaurar las experiencias

## Qué pasó
No se borró nada. Las 11 experiencias siguen guardadas. Cada una tenía una sola fecha, y la última fue el 9 de septiembre de 2026. El sitio solo muestra experiencias con fechas futuras o marcadas "bajo pedido". Como todas las fechas ya pasaron y ninguna está marcada bajo pedido, desaparecieron de la agenda, de /tours, /classes y /reserve.

## Solución
1. **Nunca más ocultar una experiencia publicada.** Si una experiencia no tiene fechas futuras, se mostrará automáticamente como "bajo pedido", con el botón de WhatsApp en lugar de desaparecer. Primero aparecen las que tienen fechas próximas, después las que son bajo pedido.
2. **Aviso en el panel de administración.** Cada experiencia sin fechas futuras mostrará una etiqueta "Sin fechas próximas: se muestra bajo pedido", para que sepas cuándo agregar nuevas fechas en el calendario.
3. Las 11 experiencias vuelven a aparecer de inmediato. Luego puedes agregar nuevas fechas desde el calendario del panel.

## Detalles técnicos
- `src/lib/tours.ts` `fetchTours`: quitar el filtro `r.dates.length > 0 || r.on_demand`; conservar el orden (con fecha primero, `Infinity` al final). `TourCard` ya usa `dates.length === 0` como bajo pedido.
- `src/routes/_authenticated/admin.tours.tsx`: mostrar una etiqueta cuando no hay `tour_dates` activas en el futuro.
- No se modifica la base de datos.
