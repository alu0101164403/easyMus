import average from './operators.js'


export function prediccionSimple(matriz, similitudes, i) {
  var denominador = 0
  similitudes.forEach((value, key) => {
    denominador += Math.abs(value)
  })

  var numerador = 0
  similitudes.forEach(function(value, key) {
    numerador += value * matriz[key][i]
  })

  return (numerador / denominador).toFixed(1)
}

prediccionSimple()



export function prediccionDiferenciaMedia(matriz, similitudes, i) {
    // map { key:1,3}
    
    var numerador = 0
    for (let k in similitudes.key()) {
        numerador += similitudes[k] * (matriz[k][i] - average(matriz[k]))
    }
    
    var denominador = 0
    for (let v in similitudes.value()) {
        denominador += Math.abs(v)
    }
    
    var prediccion = 0
    prediccion = numerador / denominador
    console.log(prediccion)
    return prediccion.toFixed(1)
}

prediccionDiferenciaMedia()

