# Boggi Boss

Tu vida tiene un equipo. Base backend en revisión, sin aplicación desplegada.

## Desarrollo

Node 24.13.0 y npm 11.6.2. Desde la raíz:

```sh
npm ci --ignore-scripts
npm run check
```

El check ejecuta TypeScript strict, ESLint, compilación y tests de dominio.
No necesita credenciales. Los paquetes aún son internos: la compilación conjunta
sale a dist/. Resolver exports y bundling con Claude antes de consumirlos en Expo.

Leer AGENTS.md y docs/PROGRESS.md antes de modificar archivos. Contratos v0.1
propuestos en docs/API_CONTRACTS.md; no hay endpoints HTTP ni persistencia todavía.
No hay migraciones aplicadas, worker, entrega push ni validación móvil.
