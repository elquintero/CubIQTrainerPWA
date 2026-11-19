import assert from 'node:assert/strict';
import * as Engine from '../cube-engine.js';

globalThis.window = globalThis;
globalThis.CM = {
  ...Engine,
  COL: { U:'#f2f2f2', D:'#ffd500', F:'#1faa59', B:'#2a6fdb', R:'#d93a2b', L:'#ff8a1f' }
};
const Insight = await import('../insight.js');
let total = 0;
for (const kind of ['EOLL','OCLL','F2L','CPLL','EPLL','PLL','OLL']) {
  for (const [id] of Object.entries(Insight.GROUPS[kind] || {})) {
    const item = Insight.getCase(kind, String(id));
    assert.ok(item, `${kind} ${id}: getCase debe devolver un caso`);
    assert.ok(Array.isArray(item.shown) && item.shown.length === 54, `${kind} ${id}: estado de 54 pegatinas`);
    assert.ok(Array.isArray(item.setup), `${kind} ${id}: setup generado`);
    if (kind !== 'F2L') assert.match(item.icon || '', /^<svg[\s>]/, `${kind} ${id}: icono SVG real`);
    else assert.ok(Array.isArray(item.pair) && item.pair.length === 2, `F2L ${id}: pareja detectada`);
    total++;
  }
}
console.log(`OK: ${total} casos CubIQ generados con el motor real.`);
