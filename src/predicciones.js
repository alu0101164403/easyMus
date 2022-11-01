import average from './operators.js'

export function prediccionSimple(matriz, similitudes, i) {
  var denominador = 0, numerador = 0;
  similitudes.forEach((value, key) => {
    numerador += value * matriz[key][i];
  });
  similitudes.forEach((value, key) => {
    denominador += Math.abs(value);
  });
  var result = numerador / denominador;
  if (result < 0) result = 0;
  console.log('Prediccion obtenida con prediccion simple:', result);
  return result.toFixed(0);
}


export function prediccionDiferenciaMedia(matriz, similitudes, i, averageU) {
    var numerador = 0, denominador = 0;
    similitudes.forEach((value, key) => {
      numerador += value * (matriz[key][i] - average(matriz[key]));
    });
    similitudes.forEach((value, key) => {
      denominador += Math.abs(value);
    });
    var result = averageU + (numerador / denominador);
    console.log('Prediccion obtenida con diferencia de media:', result);
    return result.toFixed(0);
}


