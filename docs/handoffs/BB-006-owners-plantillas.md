# BB-006 / BB-007 — Owners, plantillas y handoffs

Fecha: 2026-10-20. Responsable: Claude Code (responsable único temporal).
Revisión: autorrevisión. Rama: `chore/BB-006-owners-plantillas`. Issue: #4.

## Qué cambió

- AGENTS.md: «Matriz de owners» (área, owner de área, quién ejecuta hoy, revisión) y
  reglas para archivos compartidos. Los bullets de ownership remiten a la matriz.
- `.github/ISSUE_TEMPLATE/tarea.yml`: formulario de tarea (ID, prioridad, responsable,
  revisión, aceptación, archivos, pruebas, dependencias, handoff).
- `.github/pull_request_template.md`: resumen, archivos, pruebas reales, seguridad,
  riesgos, handoff y estado.
- `docs/handoffs/TEMPLATE.md`: plantilla de handoff.
- `docs/PROGRESS.md`: consolidado tras los merges de #1, #2 y #3.

## Validación exacta

Ver el PR: YAML validado con parser, `npm run check` y CI `verify`. El issue #4 se
creó con la estructura de la plantilla como ejemplo (BB-007).

## Checklist

BB-006 y BB-007 listos para marcar tras el merge.

## Riesgos y rollback

Solo documentación y plantillas. Revertir el PR las elimina.
