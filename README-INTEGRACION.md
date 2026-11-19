# CubIQ Trainer 3.1 · motor original integrado

Esta edición incorpora copias directas de `src/cube-engine.js` y `src/insight.js` del ZIP de CubIQ 1.34.16 recibido el 19-11-2026.

## Integración realizada

- `cube-engine.js`: motor real de 54 pegatinas, movimientos, firmas y clonación.
- `insight.js`: tablas originales CFOP, orientación `HOLD`, generación de `setup`, `shown`, `steps` e iconos SVG.
- Antes de importar `insight.js`, el Trainer registra `globalThis.CM` y `window.CM` como objeto API del motor con la paleta base de CubIQ. `CM` es un objeto, no una función.
- OLL, PLL, EOLL, OCLL, CPLL y EPLL usan los iconos SVG generados por `getCase()`/`caseIcon()` del análisis original.
- F2L usa `getCase()` y la pareja real (`pair`) calculada por el motor; el análisis original no define un icono SVG F2L.
- Se cachea cada `getCase()` para no recalcular los casos en cada render.

## Ejecutar

```bash
npm install
npm run dev
```

## Verificación de integración

```bash
npm run test:integration
```

La prueba recorre los 135 casos y comprueba que se genera un estado de 54 pegatinas y un `setup`; también verifica iconos SVG en las familias con icono y pareja en F2L.

## Límites que siguen pendientes

- El Trainer mide chunks con confirmación manual; el cubo BLE no está conectado en esta versión.
- La relación inversa/espejo sigue siendo una transformación textual exacta, no una derivación validada por equivalencia de estados del cubo.
- La paleta es la base de CubIQ; el Trainer independiente no hereda cambios de colores del usuario en la app principal.
- No se ha completado `npm run build` en este entorno: la instalación de Vite no terminó. La sintaxis de los módulos y la prueba de integración sí se han comprobado.
