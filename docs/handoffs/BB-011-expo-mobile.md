# BB-011 — Expo Router + TypeScript strict en apps/mobile

Fecha: 2026-10-20. Responsable: Claude Code (responsable único temporal).
Revisión: autorrevisión. Rama: `feat/BB-011-expo-mobile`.

## Qué cambió

- `apps/mobile` (`@boggi/mobile`): Expo SDK 58.0.16, Expo Router 58.0.24, React 19.3.0,
  React Native 0.88.0. `src/app/_layout.tsx` (Stack) e `index.tsx` (pantalla mínima que
  importa `TASK_STATUSES` de `@boggi/shared`). TS strict + `noUncheckedIndexedAccess`
  + `exactOptionalPropertyTypes`. Sin assets de plantilla ni identificadores de tienda.
- `metro.config.js`: resuelve imports `./x.js` de paquetes del workspace a `./x.ts`
  (los paquetes usan NodeNext). No afecta a `node_modules`.
- `@boggi/shared`: `exports`/`types` hacia `src/index.ts`; `TASK_STATUSES` en runtime.
- Raíz: workspace `apps/*`; TypeScript 5.9.3 → 6.0.3 (lo que espera Expo SDK 58 y
  dentro del peer de typescript-eslint 8.72.0, `<6.1.0`); `overrides` de react/react-dom
  a 19.3.0 para evitar dos copias de React (react-dom 19.3.1 arrastraba react 19.3.1);
  `typecheck` incluye la app. Lockfile regenerado.
- ESLint ignora `.expo/` y `expo-env.d.ts`; `*.config.js` de la app como CommonJS.

## Compatibilidad verificada

- `npm view expo dist-tags`: latest = 58.0.16 (publicado 2026-10-19; SDK 58.0.0 el
  2026-09-29). `engines.node` de expo: `^22.13.0 || ^24.3.0 || ...` → compatible con el
  Node 24.13.0 que exige el repo. Versiones de dependencias tomadas de
  `bundledNativeModules.json` de expo@58.0.16.
- EAS Build: falta fijar la imagen/versión de Node en `eas.json` cuando haya cuenta (BB-017).

## Validación exacta

- `npm run check`: typecheck raíz + app, lint 0 warnings, 7/7 tests. También sin
  `.expo/` ni `expo-env.d.ts` (como en CI).
- `npx expo export --platform ios --platform android`: bundles Hermes generados
  (ios 3.2 MB, android 3.1 MB, 1371 módulos); contienen el código de `@boggi/shared`.
- `npx expo start --ios` en simulador iPhone 16 Pro (iOS 26.4) con Expo Go 58.0.5:
  «iOS Bundled 4389ms», pantalla renderizada (captura revisada). Android NO probado:
  no hay `adb`/emulador en esta máquina.
- `npm audit`: 26 vulnerabilidades (7 moderadas, 19 altas) en tooling de Expo CLI
  (`xcode`, `@expo/config-plugins`…); `npm audit fix --force` rompería el SDK. Se
  revisará con parches de Expo; no afectan al bundle de la app.

## Pendientes

- BB-012/013: lint de React, format y tests de la app en `check`/CI.
- BB-017: development builds iOS/Android (requiere cuenta EAS/Apple del fundador).
