# BB-008 / BB-004 — Registro de progreso y reglas de agentes

Fecha: 2026-10-20. Responsable: Claude Code (responsable único temporal).
Rama: chore/BB-008-registro-progreso. PR: #3.

## Qué cambió
- AGENTS.md: sección «Estado del proyecto» (repo, PR, checklist, validación,
  decisiones del fundador, pendientes) y «Contexto para nuevas sesiones».
- Decisión del fundador registrada: Claude Code responsable único temporal;
  autorrevisión documentada en el PR + CI en verde sustituyen la revisión cruzada.
- CLAUDE.md: apunta a AGENTS.md.
- prompts/00_PROMPT_MAESTRO_COMPARTIDO.md: prompt maestro v1.1 versionado (BB-004).
- docs/PRODUCT.md: ya no dice que el prompt maestro falta en Git.

## Validación
Solo documentación. `npm run check` y CI `verify` en el PR.

## Pendientes
- Rutina semanal (BB-008) es del fundador: este PR solo deja el registro.
