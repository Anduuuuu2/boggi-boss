# API v0.1 — PROPUESTA para Claude

No hay endpoints implementados. No consumir en móvil hasta revisión de Claude.
Responsable de edición en BB-010: Codex. Prefijo propuesto /v1.

## Convenciones

Authorization: Bearer <JWT Supabase verificado>. Sin user_id en bodies; identidad
derivada en servidor. JSON estricto, UUID para IDs, ISO 8601 con offset para fechas.
Respuesta individual {data, request_id}; listas {data: [], next_cursor, request_id}.
Paginación cursor opaco, orden estable (created_at, id), limit por defecto 20 y máximo
100. Cursor validado y acotado al usuario/filtro; nunca permite saltarse RLS.

Escrituras requieren Idempotency-Key UUID, con alcance usuario + operación.
Misma clave y payload canónico: misma respuesta/recurso. Distinto payload: 409.
Persistir la clave con el recurso; no expirar mientras una operación siga pendiente.

Errores {error: {code, message, retryable}, request_id}; sin stack o datos personales.
400 INVALID_INPUT; 401 UNAUTHENTICATED; 403 FORBIDDEN; 404 NOT_FOUND (también recursos
ajenos); 409 IDEMPOTENCY_CONFLICT o INVALID_TRANSITION; 429 RATE_LIMITED con Retry-After;
503 DEPENDENCY_UNAVAILABLE. Solo reintentar errores transitorios, con la misma clave.

## Operaciones propuestas

- POST /conversations {title?} → 201 Conversation; GET /conversations → lista.
- GET /conversations/:id → Conversation.
- POST /messages {conversation_id, text} → 202 {message, task}; persistencia antes
  de responder. Voz y adjuntos tendrán contrato separado, aún no implementado.
- GET /messages?conversation_id=UUID → lista del usuario.
- POST /tasks {tool: "Timo.createReminder", input: CreateReminderInput} → 201 Task
  en scheduled, solo después de commit durable y autorización.
- GET /tasks y GET /tasks/:id → estado/evidencia, nunca éxito inventado.
- POST /tasks/:id/cancel {} → Task; transición controlada y confirmación explícita
  según efecto. Si ya se ejecutó: 409; no afirmar deshacer lo enviado.
- GET /approvals → lista pendiente; POST /approvals/:id/decision
  {decision: "approve" | "reject"} → Approval. Aprobación caducada/consumida: 409.
- GET /agents → Agent[] (Boggi/Timo/Milo/Nilo, capacidades y estado).
- GET /finance/summary?from=...&to=... → totales por moneda, sin conversión implícita.
- GET/POST /finance/expenses y /finance/income → Expense / Income.
  POST exige revisión explícita de extracción de recibo antes de persistir.
- GET/POST /finance/budgets y /finance/bills → Budget / Bill. P1, sin pagos bancarios.

## Tipos mínimos para revisión

```ts
type TaskStatus = 'pending' | 'awaiting_approval' | 'scheduled' | 'running'
  | 'completed' | 'failed' | 'cancelled';
type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'expired' | 'consumed';
interface Resource { id: string; user_id: string; created_at: string; updated_at: string }
interface Conversation extends Resource { title: string | null }
interface Message extends Resource {
  conversation_id: string; role: 'user' | 'assistant'; text: string;
}
interface Task extends Resource {
  tool: string; status: TaskStatus; scheduled_for: string | null;
  result: { evidence_id: string; summary: string } | null;
  error: { code: string; retryable: boolean } | null;
}
interface Approval extends Resource {
  task_id: string; status: ApprovalStatus; expires_at: string;
  action_summary: string; payload_hash: string;
}
interface Agent extends Resource {
  key: 'boggi' | 'timo' | 'milo' | 'nilo'; enabled: boolean; capabilities: string[];
}
interface CreateReminderInput { title: string; scheduled_for: string; timezone: string }
interface Money { amount_minor: number; currency: string } // entero seguro, > 0
interface Expense extends Resource, Money { category: string; occurred_at: string }
interface Income extends Resource, Money { category: string; occurred_at: string }
interface Budget extends Resource, Money { category: string; starts_at: string; ends_at: string }
interface Bill extends Resource, Money { title: string; due_at: string; recurrence: string | null }
```

Implementados como borrador en packages/shared/src/reminder.ts únicamente:
CreateReminderInput, ReminderPlan, TaskStatus y validación Zod del input.
Los otros modelos son propuesta, faltan sus esquemas runtime y precisión de finanzas.

## Ejemplo Timo

```json
{
  "tool": "Timo.createReminder",
  "input": {
    "title": "Pagar internet",
    "scheduled_for": "2026-10-20T10:00:00-05:00",
    "timezone": "America/Bogota"
  }
}
```

El instante absoluto manda; timezone se conserva para presentación. Si el texto de
voz no tiene fecha/zona inequívoca, pedir aclaración antes de construir este input.
Un recordatorio de pagar no autoriza un pago.

Transiciones: pending → awaiting_approval o scheduled/running; awaiting_approval →
scheduled/running o cancelled; scheduled → running o cancelled; running → completed
o failed. Un retry crea un nuevo intento y preserva el anterior. Cancelación concurrente
se serializa con el claim del worker. Detallar y probar estas transiciones en BB-011.

Claude debe revisar nombres, estados, errores, paginación y modelos antes de integrar.
Sin revisión recibida; no se ha contactado automáticamente a otro agente.
