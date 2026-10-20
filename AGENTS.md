# Coordinación Boggi Boss

- Antes de trabajar: leer este archivo, docs/PRODUCT.md, docs/ARCHITECTURE.md,
  docs/DESIGN_SYSTEM.md, docs/API_CONTRACTS.md, docs/ROADMAP.md,
  docs/PROGRESS.md y ADR pertinentes. Leer prompts/00_PROMPT_MAESTRO_COMPARTIDO.md
  si existe; su original aún no está versionado. Claude lee además CLAUDE.md si existe.
- El código y documentos versionados son la fuente de verdad. Registrar conflictos
  entre código y documentación y pedir acuerdo antes de resolverlos.
- Codex: supabase/**, services/**, packages/agents/**, packages/database/**,
  arquitectura, base de datos y pruebas backend.
- Claude: apps/mobile/**, packages/ui/**, personajes y design system.
- Compartidos: packages/shared/**, contratos, raíz, CI y este archivo.
  Un editor por issue; Codex es dueño del bootstrap BB-010. Después, coordinar.
- Trabajar en rama por issue y worktree independiente, nunca sobre main.
  No asumir que Orca crea worktrees automáticamente.
- Contratos y esquema requieren revisión de Claude antes de integrar el cliente.
- No inventar resultados, credenciales, proveedores, versiones verificadas o PR.
- No poner secretos en cliente, Git, prompts o logs. No registrar contenido personal.
- Efectos sensibles requieren confirmación explícita, ligada a la acción exacta.
- No tocar producción ni datos reales sin autorización. Revocación y cancelación
  se comprueban nuevamente al ejecutar trabajos programados.
- Cambios de arquitectura requieren ADR con estado Propuesta/Aceptada y aprobación.
- Cada tarea deja handoff. El integrador actualiza PROGRESS después del merge;
  su creación inicial pertenece al bootstrap.
- Done requiere pruebas pertinentes, aislamiento RLS cuando aplique, revisión
  cruzada, PR aprobado/mergeado y checklist sincronizada. Un test de dominio
  no demuestra push ni ejecución en segundo plano.

## Estado del proyecto (actualizado 2026-10-20 por Claude Code)

Registro de progreso real. Fuente de verdad del estado técnico: GitHub Issues/PR.
Actualizar esta sección al cerrar cada sesión o hito; un editor a la vez.

### Repositorio y entorno local
- Remoto: https://github.com/Anduuuuu2/boggi-boss (privado). `main` = commit vacío
  97cae40; todo el trabajo vive en ramas y PR.
- Clon de trabajo: `~/dev/boggi-boss`. Worktree BB-020: `~/dev/boggi-worktrees/BB-020`.
- NO trabajar en `~/Desktop` ni `~/Documents`: están sincronizados con iCloud, que
  vacía archivos de `.git` (git falla con `mmap failed: Resource deadlock avoided`).
  Las copias antiguas `~/Desktop/App` y `~/Documents/boggi-worktrees` quedan obsoletas.
- `main` sin protección: GitHub exige plan Pro para proteger ramas en repos privados.
  Pendiente de decisión del fundador. Mientras tanto, la regla «nunca sobre main» es
  obligatoria por convención.

### PR abiertos
| PR | Rama → base | Responsable | Revisor | Estado |
|----|-------------|-------------|---------|--------|
| #1 | feat/BB-010-codex-foundations → main | Codex | Claude | Revisado con cambios solicitados |
| #2 | feat/BB-020-design-system → feat/BB-010-codex-foundations | Claude | Codex | Esperando revisión |
| #3 | chore/BB-008-registro-progreso → feat/BB-010-codex-foundations | Claude | Codex | Este registro |

### Checklist del fundador (tablero de producto)
Ninguna tarea está Completada: ninguna tiene PR mergeado.
- BB-001 Repo privado: creado; falta protección de `main` (ver arriba).
- BB-004, BB-010, BB-012, BB-013: candidatos en PR #1. La CI no se ha ejecutado
  en GitHub (0 workflows registrados); bloqueante para el merge.
- BB-020, BB-021, BB-022 (concepto): candidatos en PR #2.
- BB-040: propuesta de Claude en `docs/proposals/BB-040-ui-contract-review.md` (PR #2).

### Validación verificada
- PR #1 en clon limpio (Node 24.13.0, npm 11.6.2): `npm ci --ignore-scripts` y
  `npm run check` PASS, 7/7 tests. Ejecutado por Claude el 2026-10-20.
- PR #2: contraste WCAG de tokens 24/24 PASS; render SVG revisado con Chrome headless.

### Decisiones del fundador
- 2026-10-20 — **Nombres de empleados personalizables por el usuario.** Timo, Milo y
  Nilo son nombres por defecto; cada usuario puede renombrarlos. Consecuencias:
  identificar agentes por rol estable (`agenda`, `research`, `finance`; Boggi =
  `boggi`), nunca por nombre; el nombre visible vive en preferencias del usuario
  (`display_name`, validado y sin PII en logs); la UI y los prompts LLM leen el nombre
  personalizado. Resuelve la duda de «Milo» frente a la referencia externa.
  Requiere actualizar contratos (BB-040) y design system (BB-022).

### Pendientes y bloqueos
1. Fundador: decidir protección de `main` (recomendado GitHub Pro).
2. Fundador: confirmar que los IDs de la checklist (BB-001…BB-116, F0–F10) son los
   oficiales. Recomendación de Claude: sí; ROADMAP.md debe alinearse.
3. Codex: corregir PR #1 (CI ejecutándose, ROADMAP alineado, versionar prompt maestro).
4. Codex: revisar PR #2 y PR #3; incorporar `AgentRole` y `display_name` en contratos.
5. Claude: tras merge de BB-010, rebasar BB-020 y empezar `packages/ui` (BB-023).
6. Sin decidir: Supabase DEV, proveedor LLM, worker (ADR-001), cuentas OAuth y push.
