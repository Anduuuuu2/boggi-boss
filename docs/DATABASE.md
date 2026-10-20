# Modelo inicial — propuesta pendiente de revisión

No hay migraciones en este cambio. Se prepararán después de revisar contratos.
Recursos privados con UUID id, user_id obligatorio, created_at y updated_at;
eventos inmutables solo created_at. Fechas timestamptz en UTC; conservar zona IANA
en programación. Dinero en unidades menores enteras con currency ISO 4217,
sin float. Índices por user_id y por vencimiento/estado para el worker.

- profiles: user_id único → auth.users, locale, timezone y preferencias.
- agents: configuración por usuario, key boggi/timo/milo/nilo, enabled;
  unique(user_id, key). El catálogo de capacidades es estático/versionado.
- conversations: título y estado de archivo.
- messages: conversation_id, role, contenido y referencias de adjuntos.
- tasks: conversation_id opcional, agent_id, tool, estado, entrada validada,
  idempotency_key, request_hash y evidencia/resumen de resultado.
- task_executions: task_id, intento, inicio/fin, estado y código de error.
- tool_executions: task_execution_id, herramienta, approval_id opcional,
  idempotency_key, estado y evidencia redactada.
- scheduled_actions: task_id, scheduled_for, timezone, estado, lease_until,
  intentos y next_attempt_at. Primer alcance: una ejecución, sin recurrencia.
- integration_connections: provider, scopes, estado, secret_ref backend y expiración.
  No access_token/refresh_token en tablas expuestas.
- approvals: task_id, herramienta, payload_hash, estado, expires_at y consumed_at.
- audit_events: actor, acción, resource_id, request_id, metadatos mínimos.
- expenses / income_records: amount_minor positivo, currency, categoría y fecha.
- budgets: categoría, currency, amount_minor, inicio/fin.
- bills: monto, currency, próximo vencimiento y regla de recurrencia; no mueve dinero.

## RLS y restricciones previstas

Habilitar RLS en todas las tablas privadas, revocar acceso anon. SELECT de authenticated
solo WHERE user_id = auth.uid(). No conceder escritura directa a estados de ejecución,
auditoría o aprobaciones: usar operaciones controladas que comprueben transición y
autorización. Preferir funciones invoker; cualquier definer exige search_path fijo,
privilegios mínimos y pruebas específicas.

Cada FK de recursos privados usa (parent_id, user_id) → (id, user_id), con UNIQUE
correspondiente. No basta con filtrar la fila hija. Definir explícitamente reglas de
borrado antes de migrar: retención de auditoría y borrado de datos requieren decisión.

Idempotencia UNIQUE(user_id, tool, idempotency_key), request_hash para detectar
reutilización con payload distinto. Crear tarea, programación y auditoría atómicamente.
Pruebas SQL futuras: A no lee/actualiza/borra B, no inserta user_id de B ni referencia
su conversación, anon no accede, no se falsifica completed, ni se consume aprobación
ajena/expirada, y rollback completo si falla una escritura. Repetir tras db reset.
