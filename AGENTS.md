# Coordinación Boggi Boss

- Antes de trabajar: leer este archivo, docs/PRODUCT.md, docs/ARCHITECTURE.md,
  docs/DESIGN_SYSTEM.md, docs/API_CONTRACTS.md, docs/ROADMAP.md,
  docs/PROGRESS.md y ADR pertinentes, y prompts/00_PROMPT_MAESTRO_COMPARTIDO.md
  (prompt maestro v1.1 versionado). Claude lee además CLAUDE.md.
- El código y documentos versionados son la fuente de verdad. Registrar conflictos
  entre código y documentación y pedir acuerdo antes de resolverlos.
- Ownership: ver «Matriz de owners» abajo. Un editor por issue en archivos compartidos.
- Trabajar en rama por issue y worktree independiente, nunca sobre main.
  No asumir que Orca crea worktrees automáticamente.
- Issues con `.github/ISSUE_TEMPLATE/tarea.yml`, PR con `.github/pull_request_template.md`
  y handoff a partir de `docs/handoffs/TEMPLATE.md`.
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

## Matriz de owners (BB-006)

| Área / rutas | Owner de área | Ejecuta hoy | Revisión |
|---|---|---|---|
| `apps/mobile/**`, `packages/ui/**`, `design/**`, `docs/DESIGN_SYSTEM.md` | Claude | Claude | Codex¹ |
| `supabase/**`, `services/**`, `packages/agents/**`, `packages/database/**` | Codex | Claude | Claude¹ |
| `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, `docs/decisions/**` (ADR) | Codex | Claude | Fundador aprueba ADR |
| `packages/shared/**`, `docs/API_CONTRACTS.md` (contratos) | Compartido | Claude | Ambos¹ |
| Raíz (`package.json`, lockfile, tsconfig, eslint, `.github/**`, CI) | Compartido | Claude | Ambos¹ |
| `AGENTS.md`, `CLAUDE.md`, `docs/ROADMAP.md`, `docs/PROGRESS.md`, `prompts/**` | Compartido | Claude | Fundador |
| `docs/PRODUCT.md`, alcance, cuentas, credenciales, pagos | Fundador | Fundador | — |

¹ Mientras rija la decisión del fundador del 2026-10-20 la revisión es autorrevisión
documentada en el PR + CI `verify`. Reglas de archivos compartidos: un solo PR abierto
a la vez que los modifique; si dos tareas los necesitan, la segunda se rebasa tras el
merge de la primera. Cuentas y credenciales nunca las crea un agente.

## Estado del proyecto (actualizado 2026-10-20 por Claude Code)

Registro de progreso real. Fuente de verdad del estado técnico: GitHub Issues/PR.
Actualizar esta sección al cerrar cada sesión o hito; un editor a la vez.

### Repositorio y entorno local
- Remoto: https://github.com/Anduuuuu2/boggi-boss (**público** desde 2026-10-20, por
  decisión del fundador para proteger ramas sin pagar). Todo cambio entra a `main`
  por PR con squash. El repo privado original quedó archivado como
  `Anduuuuu2/boggi-boss-archivo-privado` (no usar).
- Repo público: nunca versionar secretos, datos personales ni material de terceros.
  La referencia visual externa vive fuera de Git (`design/references/.gitignore`).
- Clon de trabajo: `~/dev/boggi-boss`. Worktrees por tarea: `~/dev/boggi-worktrees/BB-xxx`.
- NO trabajar en `~/Desktop` ni `~/Documents`: están sincronizados con iCloud, que
  vacía archivos de `.git` (git falla con `mmap failed: Resource deadlock avoided`).
  Las copias antiguas `~/Desktop/App` y `~/Documents/boggi-worktrees` quedan obsoletas.
- `main` protegida: PR obligatorio, check de CI `verify` obligatorio, aplica también
  a administradores, sin force push ni borrado. Aprobaciones requeridas = 0 porque
  ambos agentes publican con la cuenta del fundador y GitHub no permite aprobar el PR
  propio; la revisión cruzada se deja como comentario de revisión en el PR.

### PR
| PR | Rama | Tareas | Estado |
|----|------|--------|--------|
| #1 | feat/BB-010-codex-foundations | BB-010 | Fusionado 2026-10-20 (squash 3da2bda) |
| #2 | feat/BB-020-design-system | BB-020/021/022 | Fusionado 2026-10-20 (squash 51d4b6a) |
| #3 | chore/BB-008-registro-progreso | BB-004/BB-008 | Fusionado 2026-10-20 (squash 213f9a5) |

### Checklist del fundador (tablero de producto)
- Listos para marcar: BB-001 (repo público, `main` protegida), BB-010 (PR #1),
  BB-004 (PR #3), BB-006 y BB-007 (issue #4 y su PR).
- Parciales, NO marcar: BB-012 y BB-013 (scripts y CI existen solo para paquetes
  backend; falta app móvil). BB-040 (propuesta en PR #2, contratos aún sin aceptar).
- BB-020 (tokens, tipografía, accesibilidad), BB-021 (Boggi) y BB-022 (empleados por
  rol, nombres por defecto): listos para marcar tras PR #2. Su uso en código llega con
  BB-023 y la integración SVG en la app.

### Validación verificada
- PR #1 (Node 24.13.0, npm 11.6.2): `npm ci --ignore-scripts` y `npm run check` PASS,
  7/7 tests, local y en CI `verify`. Ejecutado por Claude el 2026-10-20.
- PR #2: contraste WCAG de tokens 24/24 PASS; render SVG revisado con Chrome headless.

### Decisiones del fundador
- 2026-10-20 — **Claude Code es responsable único temporal de todas las áreas.**
  La revisión cruzada se sustituye por autorrevisión documentada en el PR
  (`gh pr review --comment`: qué se revisó, riesgos y pruebas) + CI `verify` en verde.
  Tras ambas, Claude fusiona con `gh pr merge --squash --delete-branch`. Codex podrá
  retomar sus áreas más adelante; las referencias a Codex de este archivo y del
  ROADMAP indican el área, no quién la ejecuta mientras rija esta decisión.
- 2026-10-20 — **Nombres de empleados personalizables por el usuario.** Timo, Milo y
  Nilo son nombres por defecto; cada usuario puede renombrarlos. Consecuencias:
  identificar agentes por rol estable (`agenda`, `research`, `finance`; Boggi =
  `boggi`), nunca por nombre; el nombre visible vive en preferencias del usuario
  (`display_name`, validado y sin PII en logs); la UI y los prompts LLM leen el nombre
  personalizado. Resuelve la duda de «Milo» frente a la referencia externa.
  Requiere actualizar contratos (BB-040) y design system (BB-022).

### Pendientes y bloqueos
1. Fundador: marcar en la checklist los IDs «Listos para marcar».
2. IDs oficiales = checklist (BB-001…BB-116, F0–F10); ROADMAP.md alineado en PR #1.
3. BB-040: propuesta actualizada con `AgentRole` y `display_name`; falta el PR que
   acepte `docs/API_CONTRACTS.md` y los esquemas en `packages/shared`.
4. Sin decidir: Supabase DEV, proveedor LLM, worker (ADR-001), cuentas OAuth y push.

## Contexto para nuevas sesiones (Claude Code / Codex)

Resumen del prompt maestro v1.1 del fundador (original en prompts/00_PROMPT_MAESTRO_COMPARTIDO.md).

### Producto
- **Boggi Boss**: asistente personal de IA mobile-first para Latinoamérica.
  Lema: «Tu vida tiene un equipo». Español latinoamericano, preparado para i18n.
  iOS y Android.
- Boggi es el jefe y punto único de contacto; delega en empleados especializados:
  agenda/recordatorios (nombre por defecto Timo), investigación (Milo) y finanzas
  personales (Nilo). Los nombres son personalizables por el usuario.
- UX: «Pídele → Boggi delega → Tu equipo resuelve». Acciones reales con estado
  verificable, no una colección de chats.
- Principios: no fingir trabajo completado; privacidad y consentimiento; ninguna
  acción sensible sin confirmación explícita; tareas programadas avanzan en backend
  con la app cerrada; herramientas tipadas, idempotentes y auditables; identidad 2D
  vectorial original (trazo negro gestual, pastel suave); sin secretos en cliente/Git.
- MVP: onboarding y login; Home con chat texto/voz; empleados y actividad; Timo
  (recordatorios + Google Calendar); Milo (búsqueda con fuentes); Nilo (gastos,
  ingresos, presupuestos, facturas, sin bancos); notificaciones; compartir a Boggi;
  WhatsApp solo prepara texto y el usuario envía. App Intents/Live Activities después.

### Stack propuesto (confirmar compatibilidad)
Expo + React Native + TypeScript + Expo Router, Reanimated, TanStack Query, Zustand,
React Hook Form + Zod. Supabase (Auth, Postgres con RLS, Storage, Edge Functions).
Worker/cola durable según ADR. LLM con interfaz agnóstica. Expo Notifications.

### Gobierno
- Checklist de producto (vista del fundador, se actualiza a mano desde PR mergeados):
  https://docs.google.com/document/d/1qo5VAZsT2-A6x3FElusnu0cmtW3v0tnpH8-8ljlLyug
  Fases F0–F10, tareas BB-001…BB-116, prioridades P0/P1/P2.
- Responsables: Claude Code = frontend/UX y design system; Codex = backend, agentes,
  infraestructura y contratos; Fundador = alcance, cuentas y decisiones.
- Ramas `feat/BB-xxx-resumen`, un issue = un responsable = un PR, el otro agente revisa.
  Cada tarea deja `docs/handoffs/BB-xxx-*.md`. Decisiones de arquitectura en ADR.
- Done = PR mergeado con CI en verde, revisión cruzada (temporalmente autorrevisión,
  ver Decisiones del fundador) y checklist sincronizada.

### Notas operativas aprendidas
- Ruta del proyecto: `/Users/andrewarchbold/dev/boggi-boss`. Worktrees por tarea en
  `/Users/andrewarchbold/dev/boggi-worktrees/BB-xxx`.
- Todos los agentes usan la cuenta GitHub `Anduuuuu2`; las revisiones se publican como
  comentario (`gh pr review --comment`), no como aprobación.
- Imagen de referencia de terceros: `/Users/andrewarchbold/dev/boggi-private/references/`
  (fuera del repo). Copiarla a `design/references/` solo localmente.
- `~/Desktop/App/src/` contiene un esqueleto Expo no versionado de origen incierto;
  no se ha incorporado. Decidir con el fundador antes de borrarlo.
- No inventar claves, cuentas OAuth, URLs ni credenciales: pedirlas al fundador.
