# CubIQ Trainer 2.0 — integración con CubIQ

## Qué ya está conectado

- `insight.js` es la copia del archivo que has facilitado. La biblioteca de algoritmos se obtiene directamente de `GROUPS`.
- Los iconos de OLL/PLL/EOLL/OCLL se solicitan a `getCase(kind,id).icon`, que a su vez utiliza `caseIcon()` y el simulador `CM`. Si `CM` no está cargado, la interfaz muestra un aviso y **no dibuja patrones de sustitución**.
- Los chunks se detectan mediante coincidencias de sub-secuencias (triggers frecuentes y microbloques). Las mnemotecnias se generan como lectura verbal de los giros. Son propuestas editables, no interpretaciones semánticas certificadas.
- El motor de tiempos calcula intervalos entre giros, mediana móvil y vacilaciones. La guía se puede retirar tras tres giros correctos consecutivos y sin pausa anómala.

## Dependencia pendiente: cargar el simulador real

El archivo `insight.js` declara `CM = () => globalThis.CM || window.CM`. No contiene la implementación del cubo. Antes de importar/usar `getCase`, CubIQ debe registrar la misma función `CM` que usa la aplicación principal:

```js
// En el punto de entrada del proyecto, ANTES de cargar el Trainer:
import { CM } from './RUTA_REAL_DEL_PROYECTO/cube-model.js';
window.CM = CM;
```

La ruta y el nombre del módulo son ilustrativos: no se han inventado porque no has adjuntado el archivo que define `CM`. Debe devolver al menos los miembros que `insight.js` consume: `COL`, `solvedCube`, `FACES`, `NAME`, `mv`, `clone`, `sig`, `isSolved`.

Si tu `CM` está en un script clásico, basta con que asigne `window.CM` antes de cargar `index.html`/`insight.js`. No dupliques el simulador: usa el mismo core de CubIQ para que los casos coincidan exactamente.

## Cubo inteligente: adaptador incluido

He añadido `cube-bridge.js` usando la dependencia que ya utiliza CubIQ: `smartcube-web-bluetooth` de `poliva`. Se conecta mediante `connectSmartCube()` y escucha `conn.events$`; solo procesa eventos `MOVE` cuyo `event.move` ya venga normalizado (`R`, `R'`, `R2`, etc.). El timestamp se toma con `performance.now()` al recibir cada evento para medir intervalos de forma monotónica.

La biblioteca declara soporte para GAN, Giiker/Mi, GoCube/Rubik's Connected, MoYu y QiYi. La conexión real debe probarse con tu modelo concreto y navegador (Chrome/Edge, HTTPS o localhost). La librería es dirigida por eventos y expone `events$` como Observable. Referencia: https://github.com/poliva/smartcube-web-bluetooth.

Los movimientos aceptados por el entrenador son `R L U D F B` con sufijo opcional `2` o `'`. No se infiere el sentido a partir de `face/direction`: se utiliza `event.move` para evitar invertir giros. El adaptador desuscribe el Observable y usa `disconnect()` si la conexión lo expone; si no, intenta cerrar el GATT del dispositivo.

## Ejecutar

Sirve la carpeta desde `localhost` o HTTPS (por ejemplo `npx vite --host 0.0.0.0`). Las PWA y Web Bluetooth requieren contexto seguro; `localhost` es válido para desarrollo. Para instalación, publica la carpeta completa conservando rutas relativas.

## Importante: estado de integración

La PWA ya tiene los puntos de integración y el manejo de datos, pero **no puede completar una conexión física real** hasta incorporar el módulo exacto de `CM` y el driver BLE de tu proyecto. Para cerrar esa última parte necesito que compartas el archivo que define `CM`/el modelo de cubo y el código actual que conecta el smart cube (o el paquete/versión y el wrapper que ya usa CubIQ). No se deben inventar UUID, servicios ni movimientos.
