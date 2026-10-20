# Arquitectura propuesta

Estado: propuesta para revisión, no infraestructura desplegada.

App → API autenticada → Boggi → herramienta tipada → política de permisos y
aprobación → transacción → resultado persistido → estado consultable.
La clasificación LLM propone una intención de un catálogo cerrado; no concede
permisos ni ejecuta código libre. Una petición tiene límites de llamadas, tiempo,
tokens y coste. Sus valores y proveedor se acordarán antes de activar LLM.

## Fronteras

- packages/shared: esquemas públicos, tipos y errores sin secretos ni imports backend.
- packages/agents: dominio y política. Hoy solo prepara un recordatorio validado.
- packages/database y supabase: futuros adaptadores, migraciones, RLS y pruebas.
- services: futuro worker y orquestación. No hay proceso persistente todavía.
- apps/mobile y packages/ui: propiedad de Claude, no creados en este bootstrap.

Edge Functions: validar sesión y entrada, autorización y operaciones breves.
Responder 202 solo tras confirmar escritura durable; jamás usar una promesa
desatendida o temporizador en la app como mecanismo de programación.

Worker: reclamar vencimientos con lease, ejecutar bajo permisos vigentes, guardar
intentos, backoff limitado y dead-letter/revisión. Idempotencia por efecto; un crash
entre envío y persistencia exige reconciliación. No prometer exactly-once externo.
La tecnología, costes y SLA quedan pendientes en ADR-001.

## Flujo de autorización previsto

1. Verificar JWT con Supabase Auth; nunca confiar en user_id enviado por cliente.
2. Validar contrato Zod estricto y cargar permisos actuales del usuario.
3. Calcular política determinística por herramienta, independiente del LLM.
4. Para efectos sensibles: aprobación ligada a usuario, herramienta, hash de payload,
   caducidad y consumo único. Cambiar payload invalida la aprobación.
5. Persistir task, scheduled_action y audit_event en una transacción idempotente.
6. En cada ejecución comprobar cancelación, permisos y conexión revocados.
7. Completado requiere evidencia. Un ticket de push aceptado no prueba entrega.

prepareReminder recibe un principal confiable como puerto interno; NO valida JWT,
NO consulta permisos persistidos y NO escribe. Sus tests no prueban aislamiento SQL.

## Seguridad

RLS con auth.uid() para recursos privados y FK compuestas para evitar referencias
entre usuarios. Cliente sin service_role, secretos LLM ni tokens OAuth.
Credenciales OAuth en almacén de secretos backend; integration_connections solo
metadatos. Logs con request_id y códigos, sin texto, voz, recibos o tokens.

Referencia: https://supabase.com/docs/guides/database/postgres/row-level-security
y https://supabase.com/docs/guides/database/secure-data . La clave service_role
omite RLS; no debe usarse como atajo para peticiones de usuarios.
