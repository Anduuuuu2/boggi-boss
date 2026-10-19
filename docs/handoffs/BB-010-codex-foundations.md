# BB-010 — Codex foundations

Fecha: 2026-10-19. Estado: candidato local, NO Done.
Rama: feat/BB-010-codex-foundations.
Worktree: /private/tmp/boggi-boss-BB-010. Base: 97cae40.
Issue/PR: no creados; repositorio sin remoto. Revisión Claude: pendiente.

## Qué cambió

Bootstrap npm workspaces para packages/shared y packages/agents, TS strict, ESLint,
lockfile y CI sin credenciales. Paquetes internos compilados conjuntamente; aún
no ofrecen exports para Expo. No se creó apps/mobile ni packages/ui.

Documentos de producto, arquitectura, contratos v0.1 propuestos, modelo de datos,
roadmap, coordinación y ADR-001. Implementación preliminar prepareReminder:
validación Zod estricta, fecha futura, permiso y propietario del principal confiable.
No implementa JWT, escritura, endpoint HTTP, worker ni push.

## Auditoría de entorno

Repo vacío salvo .git; commit inicial 97cae40; main limpio y sin remotos.
No existían los documentos solicitados ni prompts/00_PROMPT_MAESTRO_COMPARTIDO.md.
Se sintetizó la especificación de la conversación; el prompt original queda pendiente
de versionar. No se inventó una lectura de archivos ausentes.

Node 24.13.0; npm 11.6.2; Git 2.50.1; Supabase CLI 2.102.0;
Orca 1.4.230; gh 2.96.0. command -v no encontró pnpm, yarn, bun, expo,
docker ni psql. Expo SDK no instalado ni compatibilidad validada.
git worktree list mostró inicialmente un único working tree. Se creó aislamiento
explícito mediante git worktree add, sin asumir automatización de Orca.

Supabase --version requirió permiso por escritura de telemetría fuera del workspace.
npm necesitó acceso de red autorizado. No se inició ni conectó ningún proyecto Supabase.

Versiones npm consultadas: TypeScript 7.0.2 como latest pero typescript-eslint 8.72.0
declara >=4.8.4 <6.1.0; por eso se fijó TypeScript 5.9.3. Zod 4.6.7.
ESLint 9.39.5 resultó sin soporte según npm: se sustituyó por 10.13.0 compatible
con el peer declarado. @types/node 24.13.0. Lockfile versionado.

## Validación exacta

- Primero se añadió el test: npm test falló por implementación ausente (TS2307 y
  errores derivados). Después se añadió prepareReminder y se ejecutó el check completo.
- npm ci --ignore-scripts: PASS, instalación desde lockfile.
- npm run check: PASS; typecheck, lint con cero warnings, build y 7 tests.
- Tests: normalización UTC, auth ausente, permiso revocado, fecha pasada/presente,
  input inválido/campos no autorizados, propiedad derivada del principal y errores
  sin contenido personal. El test de propiedad NO demuestra aislamiento RLS.
- npm install informó 0 vulnerabilidades conocidas al instalar; no sustituye auditoría.
- rg de process.env, service_role, tokens y firmas de clave privada sobre packages,
  .github y package.json: sin coincidencias. Revisión estática limitada, sin bundle móvil.
- git diff --check: PASS. main permaneció limpio.
- CI configurado, todavía no ejecutado en GitHub.

## Contratos y revisión solicitada

docs/API_CONTRACTS.md propone /v1/conversations, /messages, /tasks, /approvals,
/agents y /finance/*, auth, errores, cursores e idempotencia. Solo el input de
recordatorio y TaskStatus están codificados. Claude debe revisar antes de consumo;
no se envió mensaje externo ni se atribuyó aprobación.

## Bloqueos y siguiente paso

1. Fundador: indicar remoto GitHub/destino autorizado para issue y PR. No inventar URL.
2. Claude: revisar bootstrap y contratos; aprobar/integrar antes de scaffold móvil.
3. BB-011: acordar esquema, redactar migraciones reproducibles y ejecutar aislamiento
   multiusuario sobre PostgreSQL/Supabase real. Docker/psql no disponibles en PATH.
4. ADR-001: aprobar servicio durable después de comparar coste, región y SLA.
   Falta presupuesto y requisitos operativos; no se contrató infraestructura.
5. Para vertical completa: entorno Supabase, credenciales backend por canal seguro,
   proyecto/configuración push y dispositivo real. OAuth y LLM se decidirán después.
6. Retención/borrado, política de aprobaciones y contratos P1 necesitan precisión.
7. Prueba de ausencia de secretos en bundle requiere cliente/build; pendiente de Claude.

DoD pendiente: RLS/migraciones, worker/push, revisión cruzada, PR mergeado y checklist
sincronizada. No marcar P0 completado con estos tests.

## Riesgos y rollback

Contratos propuestos pueden cambiar tras revisión. No existe compatibilidad Expo
validada. Preparar un recordatorio no significa programarlo ni notificarlo.
No hay cambios de datos o infraestructura que revertir. Si se integra el bootstrap,
revertir su commit/PR revierte el código; no hay migraciones aplicadas.
