# Roadmap propuesto

- F0, BB-010, Codex: bootstrap reproducible, propuestas y handoff; revisión Claude,
  PR y merge antes de que empiece scaffold móvil. En curso, no Done.
- F1, BB-011, Codex: contratos aceptados, migración inicial, RLS y aislamiento real;
  depende de BB-010 y entorno PostgreSQL/Supabase local reproducible.
- F2, BB-012, Claude: sistema visual y navegación; depende del bootstrap integrado.
- F3, BB-013, compartido con dueños por issue: auth y consentimiento; requiere
  cuentas/proveedores y configuración por plataforma.
- F4, BB-014, Codex + integración Claude: chat y orquestación acotada; contrato
  aprobado, proveedor LLM, límites y errores verificables.
- F5, BB-015, Codex: vertical Timo; persistencia, worker aprobado, push real y
  pruebas en dispositivo con app cerrada. BB-010 solo adelanta tests de dominio.
- F6, BB-016: Calendar OAuth, búsqueda con fuentes y contrato de voz (P0).
- F7, BB-017: finanzas y recibos confirmados (P1).
- F8, BB-018: reglas opt-in, pausa/cancelación y proactividad (P1).
- F9, BB-019: QA, seguridad, aislamiento, accesibilidad y observabilidad.
- F10, BB-020: beta, criterios operativos y distribución aprobados.

IDs locales propuestos: no existen issues GitHub aún. Investigación posterior:
App Intents, Live Activities, Gmail y bancos. No comprometer su implementación.
