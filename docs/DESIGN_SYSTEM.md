# Design system — Boggi Boss v0.1

Estado: **Propuesta** (BB-020/021/022, Claude). Pendiente de revisión del fundador.
Fuente de verdad de tokens: `design/tokens/tokens.json`. Vista de revisión:
`design/preview/index.html` (captura en `design/screens/preview-v0.1.png`).
Aún no hay componentes implementados: esperan el scaffold móvil (ver handoff BB-020).

## 1. Principios

1. **Boggi es la puerta de entrada.** El usuario pide a Boggi; los empleados aparecen
   como responsables de tareas, nunca como chats separados.
2. **El estado es real o no se muestra.** Cada tarjeta refleja un `TaskStatus` del
   backend. Los datos de demostración llevan siempre `DemoBadge`.
3. **Confirmar antes de actuar.** Toda acción sensible pasa por `ApprovalCard`; ningún
   botón aprueba por defecto ni con un gesto ambiguo (sin swipe-to-approve).
4. **Cálido, no infantil.** Personajes expresivos, textos breves y concretos, tono adulto.
5. **Accesible por defecto.** Contraste AA, Dynamic Type, lector de pantalla, 48 pt
   de área táctil, reducción de movimiento.

## 2. Firma visual

- **Contorno de tinta**: tarjetas, inputs y botones con borde `ink` de 2 pt y sombra
  sólida desplazada (`shadow.ink`, 0/3/0). Al presionar, la sombra desaparece y el
  elemento baja 2 pt: sensación física, sin depender de animaciones largas.
- Fondo `paper` crema (no blanco puro); superficies `surface` blancas encima.
- Color por agente solo como acento (fondos suaves, avatar, indicador); el texto
  siempre en `ink` o `inkSoft`.

## 3. Tokens

| Grupo | Valores |
|---|---|
| Neutros | ink `#1C1B22`, inkSoft `#4F4A57`, paper `#FFF8EF`, surface `#FFFFFF`, surfaceMuted `#F5ECE0`, line `#E4D7C6` |
| Agentes | boggi `#FFB98A`, timo `#8EDDBE`, milo `#FFD86B`, nilo `#A8B5FF` (+ `soft` y `deep` cada uno) |
| Funcionales | focus `#2F5BFF`, dangerText `#A32014` |
| Espacio | escala de 4: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Gutter de pantalla 16 |
| Radio | sm 8 · md 14 · lg 20 · xl 28 · pill |
| Trazo | UI 2 (fuerte 2.5) · ilustración 2.5 / 4 / 5 según tamaño |
| Sombra | `ink` sólida 0/3/0 · `soft` 0/8/24 al 10 % (elevation 4 en Android) |

**Contraste verificado** (WCAG 2.x, script de validación sobre `tokens.json`): todos los
pares de texto ≥ 4.5:1. Mínimos: inkSoft/surfaceMuted 7.33, cancelled 6.78, focus/paper
4.91 (no textual, requisito 3:1). Texto sobre colores de agente: ≥ 8.72.

Modo oscuro: fuera de alcance en v0.1. Los tokens se consumirán por nombre semántico
para poder añadir un tema oscuro sin tocar componentes.

## 4. Tipografía

**Recomendación:** Nunito (títulos, 700/800) + Inter (texto, 400/500/600), ambas OFL-1.1,
cargadas con `expo-font`; respaldo a la fuente del sistema. Nunito aporta la calidez
redondeada de la marca; Inter mantiene la legibilidad en textos largos, números y
tablas de finanzas (cifras tabulares).

| Estilo | Fuente | Tamaño/línea | Peso |
|---|---|---|---|
| display | Nunito | 32/38 | 800 |
| title1 | Nunito | 26/32 | 800 |
| title2 | Nunito | 21/28 | 700 |
| headline | Inter | 17/24 | 600 |
| body | Inter | 16/24 | 400 |
| callout | Inter | 15/22 | 500 |
| footnote | Inter | 13/18 | 400 |
| caption | Inter | 12/16 | 500 |

Dynamic Type activo con `maxFontSizeMultiplier` 1.6; los layouts crecen en vertical,
nunca truncan importes, fechas ni el resumen de una aprobación.

**Estilos:** `StyleSheet` + tokens tipados, sin NativeWind (depuración y accesibilidad
más predecibles; un solo origen de valores).

## 5. Personajes

Identidad propia. Rasgos comunes que la distinguen de la referencia externa:
**contorno negro continuo de grosor variable** alrededor de todo el cuerpo (la referencia
usa manchas sin contorno con trazos sueltos), relleno plano con degradado vertical
discreto (sin textura acuarela), **cuerpo completo con pies**, ojos ovalados con brillo
blanco, mejillas suaves y **un accesorio de oficio** por personaje.

| Personaje | Silueta | Color | Accesorio y gesto | Archivo |
|---|---|---|---|---|
| Boggi | guijarro ancho y bajo, el más grande | durazno | auriculares de coordinador con micrófono; señala para delegar; una ceja alzada | `boggi-*.svg` |
| Timo | cápsula alta y estrecha | menta | mechón de manecillas de reloj; reloj de pulsera; cejas rectas | `timo-neutral.svg` |
| Milo | gota inclinada hacia delante | mantequilla | binoculares colgados; ojos de distinto tamaño, boca «o» | `milo-neutral.svg` |
| Nilo | campana de base ancha y estable | pervinca | libreta abrazada, lápiz tras la cabeza; párpados tranquilos | `nilo-neutral.svg` |

Expresiones v0.1: Boggi `neutral`, `happy` (completado), `concerned` (atención/error).
Siguiente iteración: `working` y `thinking` para los cuatro; variante `head` recortada
para avatares ≤ 32 pt. Reglas:

- Las expresiones comunican estado **junto con** texto e icono, nunca solas.
- No usar la referencia externa como plantilla: ni composición, ni accesorios
  equivalentes (lupa, bombilla, portapapeles), ni paleta acuarela.
- Exportación: SVG optimizado para `react-native-svg`. Lottie/Rive solo tras ADR.
- `design/references/` contiene inspiración externa **no reutilizable**.

## 6. Componentes (`packages/ui`)

| Componente | Contrato visual y de accesibilidad |
|---|---|
| `Text` | variantes de §4; `accessibilityRole="header"` en títulos |
| `Button` | `primary` (ink), `secondary` (surface + borde), `ghost`, `danger`; estados `loading` (bloquea doble toque), `disabled`; alto 48 |
| `Card` | surface, borde ink 2, radio lg, sombra ink; `pressable` opcional |
| `AgentAvatar` | `agent` × `expression` × `size` (24/40/64/96/160); etiqueta «Timo, trabajando» |
| `TaskStatusPill` | 7 estados de `TaskStatus` (incl. `scheduled`); icono + texto, nunca solo color |
| `MessageBubble` | `user` (ink), `boggi`/`agent` (surface con autor), `system`; `sending`, `failed` con «Reintentar» |
| `ApprovalCard` | qué agente, qué herramienta, detalle exacto de la acción, `Rechazar` / `Aprobar`; expirada o consumida → solo lectura |
| `TaskCard` | avatar + título + meta + pill; evidencia o error visibles al abrir |
| `EmptyState` / `ErrorState` | ilustración + titular concreto + CTA; error con código de soporte (`request_id`) |
| `DemoBadge` | «DATOS DE DEMOSTRACIÓN», ink + amarillo, obligatorio con `MockAdapter` |
| `AskBar` | «Pídele algo a Boggi…» + botón de voz push-to-talk (48×48) |

Copy: tuteo neutro latinoamericano, frases cortas, verbo primero en CTAs
(«Aprobar», «Registrar un gasto»). Nunca «¡Listo!» sin evidencia.

## 7. Movimiento

Duraciones 120/200/320 ms, spring (18/220/1). Animaciones solo para entrada de
tarjetas, cambio de estado y presencia del personaje activo. Con
`useReducedMotion()` (Reanimated) / `AccessibilityInfo.isReduceMotionEnabled()`:
sin traslaciones, escalas ni bucles; solo opacidad ≤ 120 ms. Ninguna animación bloquea
la interacción ni retrasa la aparición de un estado.

## 8. Accesibilidad

- Área táctil ≥ 48×48 (usa `hitSlop` si el visual es menor).
- Todo control con `accessibilityLabel` y `accessibilityState`; pills anuncian el
  estado completo («Tarea Dentista, espera tu aprobación»).
- Cambios de estado de tareas anunciados con `accessibilityLiveRegion` /
  `AccessibilityInfo.announceForAccessibility`.
- Ilustraciones decorativas ocultas al lector; las informativas con etiqueta.
- Verificar en iPhone SE (375×667) y iPhone 17 Pro Max, VoiceOver y TalkBack.

## 9. Navegación

Ver `design/navigation-map.md`.
