import average from './operators.js'

export function prediccionSimple(matriz, similitudes, i) {
  var denominador = 0, numerador = 0;
  similitudes.forEach((key, value) => {
    denominador += Math.abs(value);
  });
  similitudes.forEach((value, key) => {
    numerador += value * matriz[key][i];
  });
  return (numerador / denominador).toFixed(0);
}

export function prediccionDiferenciaMedia(matriz, similitudes, i) {
    var numerador = 0, denominador = 0;
    similitudes.forEach((value, key) => {
      numerador += value * (matriz[key][i] - average(matriz[key]));
    });
    similitudes.forEach((value, key) => {
      denominador += Math.abs(value);
    });
    var prediccion = numerador / denominador
    return prediccion.toFixed(0)
}


