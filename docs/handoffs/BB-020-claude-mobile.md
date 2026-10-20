# BB-020 — Claude mobile/design (Fase A: diseño)

Fecha: 2026-10-19. Estado: **Fase A candidata, NO Done.**
Rama: `feat/BB-020-design-system`, rebasada sobre `main` el 2026-10-20 tras el merge
de BB-010 (#1) y BB-008 (#3). Worktree: `~/dev/boggi-worktrees/BB-020`. PR: #2.

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

## Actualización 2026-10-20 — nombres personalizables

Decisión del fundador aplicada: personajes, tokens, assets y rutas por rol estable
(`boggi`, `agenda`, `research`, `finance`); Timo, Milo y Nilo son nombres por defecto.
- SVG renombrados: `agenda-neutral.svg`, `research-neutral.svg`, `finance-neutral.svg`
  (títulos accesibles e IDs de degradado por rol). Previews actualizadas.
- `tokens.json`: `color.agent.{boggi,agenda,research,finance}`.
- DESIGN_SYSTEM §5: reglas de nombre visible, validación y flujo de renombrar en
  onboarding (`team.tsx`) y Ajustes/detalle (`team/[role].tsx`).
- BB-040: `AgentRole`, `display_name`, `PATCH /agents/:role` y herramientas por rol.

## Dudas resueltas

1. «Milo» frente a la referencia externa: resuelto por la decisión de nombres
   personalizables (solo es un nombre por defecto; el rol y el diseño son propios).
2. Numeración: ROADMAP alineado con la checklist en #1.
3. Contratos: los cambios siguen como propuesta hasta el PR de BB-040.

## Dependencias y siguientes tareas

- BB-011: `apps/mobile` con Expo Router + TS strict (Claude, responsable único temporal).
- Fase B1: `packages/ui` (tokens.ts + componentes + tests RNTL).
- Fase B2: rutas, `DataAdapterProvider`, `MockAdapter`.
- Fase B3: Home/Chat, voz visual, pruebas en iPhone SE y 17 Pro Max.
- Iteración de personajes: expresiones `working`/`thinking` y variante `head`.

## Riesgos

Personajes v0.1 son conceptos; pueden necesitar pulido por ilustrador para trazo
gestual más rico. Fuentes Nunito/Inter cargadas desde Google Fonts solo en la preview;
en la app se empaquetarán con `expo-font`.
