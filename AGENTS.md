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
