// Adaptador real para poliva/smartcube-web-bluetooth.
// El permiso Bluetooth se solicita desde el clic del usuario en Conectar.
import { connectSmartCube } from 'smartcube-web-bluetooth';

export async function connectCubiqSmartCube(onMove) {
  const conn = await connectSmartCube();
  if (!conn?.events$?.subscribe) throw new Error('La conexión no expone events$; revisa la versión instalada de smartcube-web-bluetooth.');
  const subscription = conn.events$.subscribe(event => {
    if (event?.type !== 'MOVE') return;
    // La biblioteca publica el movimiento normalizado en event.move.
    // No se deduce la cara desde face/direction para evitar invertir sentidos.
    const move = String(event.move ?? '').trim();
    if (!/^[RLUDFB](2|')?$/.test(move)) {
      console.warn('Movimiento no normalizado recibido del cubo:', event);
      return;
    }
    onMove({ move, timestamp: performance.now(), source: 'smartcube-web-bluetooth' });
  });
  return {
    unsubscribe: () => subscription.unsubscribe(),
    async disconnect() {
      subscription.unsubscribe();
      // La API puede exponer disconnect según el driver/dispositivo.
      if (typeof conn.disconnect === 'function') await conn.disconnect();
      else if (conn.device?.gatt?.connected) conn.device.gatt.disconnect();
    }
  };
}
