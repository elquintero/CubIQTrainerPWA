# CubIQ Trainer 3.0

PWA de entrenamiento cognitivo local para los casos CFOP incluidos en `insight.js`.

## Qué incorpora

1. **Reconocimiento visual**: presenta el patrón durante 1,5 s, lo oculta y ofrece cuatro casos de la misma familia. Registra acierto y latencia de respuesta.
2. **Recuperación**: solicita nombre, chunks y algoritmo sin mostrar la solución. Compara nombre, secuencia y etiquetas de bloques.
3. **Derivación**: busca relaciones algebraicas exactas entre algoritmos (inversa o espejo R/L). Solo propone automáticamente las coincidencias exactas; no deduce parentescos por nombre o similitud visual. La comprobación final es de secuencia algebraica. El espejo implementado invierte el sentido de giro de cada cara y permuta R/L; su correspondencia visual debe validarse con CM antes de considerarla una relación de casos garantizada.
4. **Chunks**: divide algoritmos en motivos conocidos y bloques cortos. Durante ejecución mide tiempo por bloque e interrupciones declaradas por el usuario.
5. **Adaptación**: prioriza reconocimiento cuando la tasa de acierto es baja, recuperación cuando falla el recuerdo y ejecución cuando hay interrupciones registradas.
6. **Intercalado**: prepara una sesión aleatoria con varios casos de una misma familia para practicar discriminación dentro de una misma familia; no calcula todavía similitud visual entre patrones.

## Integración del simulador CM (necesaria para patrones reales)

`insight.js` exporta `getCase(kind,id)` y `GROUPS`, pero depende de `CM()` para crear el estado real del cubo. Este paquete no incluye el módulo que registra `window.CM`. Carga el módulo real del proyecto CubIQ **antes** de que se ejecute `insight.js`, o adapta su exportación para exponer `window.CM`.

Mientras `CM` no esté disponible, la app muestra un aviso explícito en el ejercicio de reconocimiento. No dibuja patrones ficticios. Los algoritmos y las etiquetas proceden de `insight.js`.

## Límites deliberados

- La latencia de reconocimiento se mide desde que desaparece el patrón hasta la respuesta.
- La ejecución de chunks se cronometra con el botón de finalización; la interrupción es autodeclarada. No equivale a una medición de movimiento del smart cube.
- La derivación automática compara transformaciones de notación. No afirma que dos casos sean equivalentes en todas las orientaciones del cubo; para eso se necesita validar estados con CM y metadatos de orientación.
- El intercalado agrupa por familia CFOP, no por distancia visual calculada.
- Las reglas adaptativas son heurísticas iniciales, transparentes y locales; no están clínicamente ni experimentalmente validadas.
- Los datos permanecen en `localStorage`. Exporta regularmente una copia desde Progreso.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```
