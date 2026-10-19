# BB-040 — Revisión de Claude a API v0.1 (necesidades de la UI)

Estado: **Propuesta para Codex**. No modifica `docs/API_CONTRACTS.md` (archivo
compartido; su editor en BB-010 es Codex). Fecha: 2026-10-19.

## Aceptado sin cambios

Convenciones de auth, `{data, request_id}`, cursores, `Idempotency-Key`, códigos de
error y `retryable`. `TaskStatus` con `scheduled` (la UI añade la pill «Programada»).
`ApprovalStatus` con `consumed`. `Money` en unidades menores.

## Cambios solicitados

1. **Message — autoría por agente.** `role: 'user' | 'assistant'` no permite mostrar
   «Timo dice…». Propuesta: añadir `agent_key: AgentKey | null` (null para `user`)
   y `task_ids: string[]` para enlazar tarjetas en el hilo.
2. **Task — datos de tarjeta.** La UI necesita sin parsear `tool`:
   `agent_key: AgentKey`, `title: string` (texto ya seguro para mostrar),
   `approval_id: string | null`. Opcional: `error.message` legible y no sensible.
3. **Approval — qué se aprueba exactamente.** Añadir `agent_key`, `tool`,
   `details: Array<{label: string; value: string}>` (lo que verá el usuario y lo que
   se hashea en `payload_hash`) y `sensitivity: 'normal' | 'sensitive'`.
   La UI nunca reconstruye el detalle por su cuenta.
4. **AgentStatus.** `GET /agents` devuelve capacidades pero no estado. Propuesta:
   `status: 'idle' | 'working' | 'needs_attention' | 'disabled'` y
   `active_task_count: number`, derivados en servidor.
5. **Evidencia.** `result.evidence_id` + `summary`: ¿habrá `GET /evidence/:id` o un
   `url` externo (p. ej. enlace al evento de Calendar)? La UI lo mostrará en
   `task/[taskId]`.
6. **Tiempo real.** Definir cómo se entera la app de cambios de estado: polling con
   TanStack Query (intervalo propuesto 5 s solo con tareas `running`) o Realtime.
   Decisión de Codex vía ADR; la UI se adapta.

## Tipos que consumirá la UI (derivados, no definidos por la UI)

```ts
type AgentKey = 'boggi' | 'timo' | 'milo' | 'nilo';
// Estado solo cliente (optimista), no viaja al servidor:
type DeliveryStatus = 'sending' | 'sent' | 'failed';
```

## Adaptador mientras no exista la API

```ts
interface BoggiDataAdapter {
  listTasks(params?: { status?: TaskStatus; cursor?: string }): Promise<Page<Task>>;
  getTask(id: string): Promise<Task>;
  listAgents(): Promise<Agent[]>;
  listApprovals(): Promise<Page<Approval>>;
  decideApproval(id: string, decision: 'approve' | 'reject', idempotencyKey: string): Promise<Approval>;
  listMessages(conversationId: string, cursor?: string): Promise<Page<Message>>;
  sendMessage(input: { conversation_id: string; text: string }, idempotencyKey: string):
    Promise<{ message: Message; task: Task | null }>;
}
```

Implementaciones: `HttpAdapter` (cuando haya endpoints) y `MockAdapter` en
`apps/mobile/src/demo/`, etiquetado y excluible del build de producción. Los tipos se
importarán de `packages/shared` cuando Codex publique sus esquemas runtime.
