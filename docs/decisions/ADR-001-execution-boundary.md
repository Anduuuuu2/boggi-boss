# ADR-001 — API breve y programación durable

Estado: Propuesta. Aprobación: pendiente del fundador y revisión de Claude.

Contexto: los recordatorios deben avanzar con la app cerrada, con revocación,
reintentos, idempotencia y evidencia. Este bootstrap no instala un worker.

Alternativas: cron + PostgreSQL y worker pequeño; cola gestionada con worker;
plataforma de workflows. Comparar SLA, coste fijo/por ejecución, carga operativa,
región, observabilidad y soporte de retries antes de elegir proveedor.

Decisión propuesta: HTTP autentica y persiste; un proceso backend separado ejecuta
scheduled_actions. Mantener catálogo acotado de herramientas y puertos de proveedor.
No red ilimitada de agentes. No crear infraestructura adicional en BB-010.

Consecuencias: transacción de tarea + programación + auditoría, lease recuperable,
historial de intentos y reconciliación de efectos externos. La aceptación push y
la entrega deben registrarse por separado. Elegir proveedor requiere presupuesto,
región y expectativas de latencia; aún no hay cifras investigadas ni aprobadas.
