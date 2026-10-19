# BB-020 — Claude mobile/design (Fase A: diseño)

Fecha: 2026-10-19. Estado: **Fase A candidata, NO Done.**
Rama: `feat/BB-020-design-system`, creada sobre `feat/BB-010-codex-foundations` (3acc55c)
porque `docs/DESIGN_SYSTEM.md` nace en el bootstrap; el PR depende de BB-010.
Worktree: `/Users/andrewarchbold/Documents/boggi-worktrees/BB-020`.
Issue/PR: no creados (repo sin remoto; `gh` sin sesión válida).

## Qué cambió

- `docs/DESIGN_SYSTEM.md`: especificación v0.1 (principios, tokens, tipografía,
  personajes, componentes, movimiento, accesibilidad). Reemplaza el placeholder de Codex.
- `design/tokens/tokens.json`: tokens fuente.
- `design/characters/*.svg`: Boggi (neutral, happy, concerned), Timo, Milo, Nilo.
  Originales, dibujados a mano en SVG.
- `design/navigation-map.md`: rutas Expo Router propuestas.
- `design/preview/index.html` + `design/screens/preview-v0.1.png`: vista de revisión con
  Home, chat con aprobación y Equipo/estado vacío (datos de demostración etiquetados).
- `design/references/`: README de no reutilización (la imagen de terceros no se versiona).
- `docs/proposals/BB-040-ui-contract-review.md`: revisión de API v0.1 para Codex.

No hay código de app: `apps/mobile` y `packages/ui` no existen hasta integrar el scaffold.

## Validación exacta

- Contraste WCAG de todos los pares de tokens con un script Node sobre `tokens.json`:
  24/24 PASS (mínimo texto 6.78:1; focus 4.91:1 frente a requisito 3:1).
- Render de SVG y preview con Chrome headless; captura revisada visualmente.
- No aplica typecheck/lint/tests: no se añadió TypeScript.

## Dudas abiertas

1. **Nombre «Milo»** coincide con un personaje de la referencia externa con el mismo
   rol (investigación). Recomiendo valorar otro nombre o validarlo con el fundador.
2. Numeración: el `ROADMAP.md` de Codex usa BB-012 para diseño y BB-020 para beta; la
   checklist del fundador usa BB-020…028 para diseño. Seguir la checklist (aprobado por
   el fundador); Codex debe ajustar ROADMAP en su PR.
3. Contratos: 6 cambios solicitados en la propuesta BB-040.

## Dependencias y siguientes tareas

- Bloqueante: BB-001 (repo GitHub) y merge de BB-010.
- BB-011 (Codex) debe añadir `apps/mobile` con Expo Router + TS strict, o acordar que
  Claude lo cree en un issue propio tras el merge de BB-010.
- Fase B1: `packages/ui` (tokens.ts + componentes + tests RNTL).
- Fase B2: rutas, `DataAdapterProvider`, `MockAdapter`.
- Fase B3: Home/Chat, voz visual, pruebas en iPhone SE y 17 Pro Max.
- Iteración de personajes: expresiones `working`/`thinking` y variante `head`.

## Riesgos

Personajes v0.1 son conceptos; pueden necesitar pulido por ilustrador para trazo
gestual más rico. Fuentes Nunito/Inter cargadas desde Google Fonts solo en la preview;
en la app se empaquetarán con `expo-font`.
