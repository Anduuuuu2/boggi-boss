# Roadmap

Alineado con la checklist del fundador v1.1 (19 oct 2026), que es la referencia de
IDs y fases: BB-001…BB-116, F0–F10. Prioridad P0 = demo funcional, P1 = beta,
P2 = pos-MVP. Estado técnico real: GitHub Issues/PR y docs/PROGRESS.md.
Una tarea solo está Completada con PR mergeado, CI en verde y revisión registrada.

## F0 — Gobierno, memoria y colaboración
Salida: repo listo, un responsable por tarea, documentación única y revisión acordada.
- BB-001 P0 Fundador: repo GitHub y reglas de ramas (main protegida, PR obligatorio).
- BB-002 P0 Fundador: alcance del MVP y primeros casos de uso en PRODUCT.md.
- BB-003 P0 Fundador + Codex: revisar ADR-001 y confirmar stack técnico.
- BB-004 P0 Codex: publicar AGENTS.md y CLAUDE.md.
- BB-005 P0 Codex: validar worktrees de Orca o usar clones aislados.
- BB-006 P0 Ambos: matriz de owners y archivos compartidos.
- BB-007 P0 Codex: plantillas de issue/PR y handoffs.
- BB-008 P1 Fundador: rutina semanal de progreso.

## F1 — Base técnica y CI
Salida: la app base compila en iOS y Android y la CI reporta errores de lint/tipos.
- BB-010 P0 Codex: scaffold monorepo único con lockfile reproducible.
- BB-011 P0 Codex: Expo Router + TypeScript strict en apps/mobile.
- BB-012 P0 Codex: lint, format y scripts documentados.
- BB-013 P0 Codex: CI para PR (lint, tipos y pruebas).
- BB-014 P0 Codex: proyecto Supabase DEV, entornos documentados sin secretos.
- BB-015 P0 Codex: estrategia de variables y secretos (cliente sin service-role ni LLM).
- BB-016 P0 Codex: README de ejecución local.
- BB-017 P1 Ambos: builds de desarrollo iOS/Android en dispositivo o emulador.

## F2 — Sistema visual y experiencia móvil
Salida: Home, onboarding y navegación funcionan visualmente; demos identificadas.
- BB-020 P0 Claude: design tokens, tipografía y accesibilidad.
- BB-021 P0 Claude: identidad 2D original de Boggi.
- BB-022 P1 Claude: Timo, Milo y Nilo visualmente.
- BB-023 P0 Claude: componentes UI base reutilizados en dos pantallas.
- BB-024 P0 Claude: navegación principal.
- BB-025 P1 Claude: onboarding y permisos contextuales.
- BB-026 P0 Claude: UI de chat y estados de tareas.
- BB-027 P1 Claude: microinteracciones y reduced motion.
- BB-028 P1 Claude: layouts compactos y lectores de pantalla.

## F3 — Usuarios, sesiones y seguridad base
Salida: cada usuario accede solo a sus datos y puede revocar/cerrar sesión.
- BB-030 P0 Codex: Supabase Auth email. BB-031 P0 Codex: perfiles con RLS.
- BB-032 P0 Codex: RLS con tests negativos entre dos usuarios.
- BB-033 P0 Claude: interfaz de autenticación conectada.
- BB-034 P1 Codex + Claude: Apple y Google. BB-035 P1 Codex: preferencias y consentimiento.
- BB-036 P1 Codex: borrado de cuenta/datos. BB-037 P1 Fundador + Codex: retención.

## F4 — Conversación y motor Boggi
Salida: Boggi ejecuta al menos una herramienta con seguimiento real de extremo a extremo.
- BB-040 P0 Codex + Claude: contratos Chat/Task/Approval aceptados por PR.
- BB-041 P0 conversaciones; BB-042 P0 mensajes persistidos; BB-043 P0 proveedor LLM
  intercambiable; BB-044 P0 orquestador con tool calling; BB-045 P0 registro y
  permisos de herramientas; BB-046 P0 estados y auditoría; BB-047 P0 approval antes
  de efectos externos (Codex).
- BB-048 P0 Claude: chat móvil y tarjetas conectados a la API real.
- BB-049 P1 límites de tokens/coste; BB-050 P1 pruebas de prompt injection (Codex).

## F5 — Los tres empleados del MVP
Salida: cada empleado ejecuta una tarea real verificable.
- BB-060 P0 registro de empleados; BB-061 P0 Timo recordatorio en BD; BB-062 P1 Milo
  búsqueda real; BB-063 P0 Nilo gasto por texto; BB-066 P1 cancelación/error (Codex).
- BB-064 P1 Claude: estado por empleado. BB-065 P0 Ambos: flujo Boggi→empleado→resultado.

## F6 — Integraciones
Salida: integraciones reales del MVP con permisos claros y fallbacks.
- BB-070 P0 Calendar OAuth; BB-071 P0 leer eventos; BB-072 P1 crear evento (Codex).
- BB-073 P0 push token y preferencias (Codex + Claude); BB-074 P0 push real con app
  cerrada (Codex). BB-075 P1 voz (Ambos). BB-076 P1 búsqueda con fuentes (Codex).
- BB-077 P1 compartir a Boggi (Claude). BB-078 P2 WhatsApp con envío manual (Ambos).
- BB-079 P2 viabilidad App Intents / Live Activities (Ambos).

## F7 — Finanzas personales / Nilo
Salida: registrar y consultar gastos correctamente, sin acceso bancario.
- BB-080 P0 tablas con RLS; BB-081 P0 gastos por voz/texto; BB-082 P1 categorías;
  BB-084 P1 presupuestos; BB-085 P1 facturas; BB-086 P1 recibos con revisión;
  BB-087 P2 CSV (Codex). BB-083 P1 dashboard (Claude). BB-088 P0 saldo real vs
  estimación (Ambos).

## F8 — Proactividad responsable
Salida: recordatorios y reglas confiables y configurables.
- BB-090 P0 worker/cola con ADR (continúa ADR-001); BB-091 P0 job único con zona
  horaria; BB-092 P1 recurrencias; BB-093 P1 cancelación segura; BB-094 P0
  idempotencia; BB-097 P1 auditoría de intentos (Codex). BB-095 P1 centro de reglas
  (Claude). BB-096 P1 control de notificaciones (Ambos).

## F9 — Calidad, seguridad y fiabilidad
- BB-100 P0 auth y RLS cross-user; BB-101 P0 orquestación; BB-106 P0 secretos y PII;
  BB-108 P1 coste IA (Codex). BB-102 P0 E2E recordatorio en dispositivo; BB-103 P0 E2E
  gasto (Ambos). BB-104 P1 accesibilidad; BB-105 P1 offline (Claude). BB-107 P1 rendimiento.

## F10 — Beta privada
- BB-110 P0 builds TestFlight/Android (Ambos); BB-111 P1 errores y analytics consentidos
  (Codex); BB-112 P0 piloto LATAM, BB-114 P1 retención, BB-116 P1 monetización
  (Fundador); BB-113 P0 métrica de tareas; BB-115 P0 bugs y feedback.

## Dependencias clave
BB-010 → BB-011 → BB-012/013 → F2. BB-014 (cuenta Supabase del fundador) → F3.
BB-040 → BB-041…048; BB-048 requiere API real. BB-090 (ADR-001 aceptada) → BB-074 y
BB-091…094. Investigación posterior sin compromiso: App Intents, Live Activities,
Gmail y bancos.

Nota: mientras rija la decisión del fundador del 2026-10-20, Claude Code asume
también las tareas marcadas «Codex» (ver AGENTS.md).
