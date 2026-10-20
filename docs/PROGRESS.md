# Progreso

Registro consolidado por el integrador después de cada merge. Estado vivo y
pendientes: sección «Estado del proyecto» de AGENTS.md. Evidencia: PR en GitHub.

## 2026-10-20 — F0 cerrada en GitHub, base integrada

- #1 BB-010 fusionado (3da2bda): monorepo npm workspaces, TS strict, ESLint, CI
  `verify`, docs base, contratos v0.1 propuestos y ADR-001 (Propuesta). ROADMAP
  alineado con la checklist del fundador (BB-001…BB-116, F0–F10).
- #3 BB-004/BB-008 fusionado (213f9a5): AGENTS.md con estado y contexto, CLAUDE.md,
  prompt maestro v1.1 versionado. Decisión: Claude Code responsable único temporal,
  autorrevisión + CI en lugar de revisión cruzada.
- #2 BB-020/021/022 fusionado (51d4b6a): design system v0.1, personajes por rol
  estable con nombres personalizables, mapa de navegación, propuesta BB-040.
- BB-006/BB-007 (issue #4): matriz de owners, plantillas de issue/PR y de handoff.

Validación: `npm ci --ignore-scripts` y `npm run check` PASS (7/7) en cada PR, local
y en CI. No hay app móvil, backend desplegado, migraciones, RLS probado, worker ni push.

## 2026-10-19 — creación inicial BB-010

Repositorio inicial: commit 97cae40, main, sin archivos versionados ni remoto.
Bootstrap preparado por Codex en worktree aislado. Detalle de validación y bloqueos
en docs/handoffs/BB-010-codex-foundations.md.
