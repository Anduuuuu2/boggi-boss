# Mapa de navegación — Expo Router (propuesta BB-024)

Estado: Propuesta. Se implementa en `apps/mobile/app/` cuando el scaffold móvil esté
integrado. Nombres de ruta en inglés; textos visibles en español (i18n preparado).

```
app/
  _layout.tsx                  Providers: QueryClient, DataAdapterProvider, fuentes, SafeArea
  index.tsx                    Redirección: sin onboarding → (onboarding); sin sesión → (auth); si no → (app)
  (onboarding)/
    index.tsx                  Bienvenida: «Tu vida tiene un equipo». Presenta a Boggi
    team.tsx                   Conoce a tu equipo (Timo, Milo y Nilo por defecto) y, si quieres, cámbiales el nombre
    consent.tsx                Qué guarda Boggi y cómo controlarlo. Sin permisos del sistema aquí
  (auth)/
    sign-in.tsx                Email (BB-030). Apple/Google visibles solo cuando BB-034 exista
  (app)/
    (tabs)/
      _layout.tsx              5 tabs, iconos + etiqueta, área táctil 48
      home.tsx                 Inicio: Boggi + saludo, AskBar, «Necesita tu OK», «En curso»
      activity.tsx             Actividad: tareas filtrables por estado, historial
      team/index.tsx           Equipo: Boggi y empleados con AgentStatus y nombre visible
      finance.tsx              Finanzas (empleado finance): resumen; vacío hasta BB-080/BB-083
      settings/index.tsx       Ajustes: perfil, preferencias, privacidad, cerrar sesión
    chat/[conversationId].tsx  Conversación con Boggi (stack, se abre desde AskBar)
    task/[taskId].tsx          Detalle: estado, evidencia, error, cancelar si procede
    approval/[approvalId].tsx  Modal de confirmación (presentation: modal)
    team/[role].tsx            Detalle de empleado por rol (agenda/research/finance): renombrar, permisos, actividad
    settings/connections.tsx   Conexiones (Google Calendar…) con estado real de IntegrationConnection
```

## Reglas

- Las rutas y parámetros usan el rol estable, nunca el nombre visible (personalizable).

- Los permisos del sistema (notificaciones, micrófono, cámara) se piden **en contexto**,
  la primera vez que el usuario usa la función, nunca en el onboarding.
- `approval/[id]` es accesible también desde una notificación push (deep link).
- Pantallas sin backend todavía muestran `EmptyState` honesto o datos del `MockAdapter`
  con `DemoBadge`; nunca un éxito simulado.
- Voz: el botón de micrófono existe visualmente; sin proveedor de voz muestra
  «La voz aún no está conectada» y no simula transcripción.
