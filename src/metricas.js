// import average from './operators.js'

/**
 * Calcular de medidas de similitud: Correlacion de Pearson
 */
export function Pearson(matriz) {
    //onsole.log('matriz  person', matriz)
    // calcular la media de ambos usuarios
    const average_u1 = matriz[0].reduce((a, b) => a + b, 0) / matriz[0].length;
    const average_u2 = matriz[1].reduce((a, b) => a + b, 0) / matriz[1].length;

    var similitud = 0, numerador = 0, sum_den_a = 0, sum_den_b = 0;

    matriz[0].forEach((valoracion, index) => {
        // numerador
        //console.log('val', matriz[0][index])
        var prod_a = valoracion - average_u1;
        //console.log('prodA', prod_a)
        var prod_b = matriz[1][index] - average_u2;     
        numerador += (prod_a * prod_b);
        // denominador
        sum_den_a += Math.pow(prod_a, 2);
        //console.log('sum1', sum_den_a)
        sum_den_b += Math.pow(prod_b, 2);
    });

    var denominador = Math.sqrt(sum_den_a) * Math.sqrt(sum_den_b);
    //console.log('den', denominador)
    
    similitud = numerador / denominador;
    //console.log('pearson', similitud.toFixed(2))
    return similitud.toFixed(2);
}

/**
 * Calcular de medidas de similitud: Distancia Coseno
 */
export function distanciaCoseno(matriz) {
    
    var user1 = matriz[0]
    var user2 = matriz[1]
    
    var numerador = 0
    var u1Denominador = 0
    var u2Denominador = 0
    
    for(let i = 0; i < user1.length; i++) {
        numerador += user1[i] * user2[i]
        u1Denominador += Math.pow(user1[i], 2)
        u2Denominador += Math.pow(user2[i], 2)
    }
    var denominador = (Math.pow(u1Denominador, 0.5).toFixed(3)) * (Math.pow(u2Denominador, 0.5).toFixed(3))
    var sim = numerador / denominador
    
    return sim.toFixed(2)
}



/**
 * Calcular de medidas de similitud: Distancia Euclidea
 */
export function distanciaEuclidea(matriz) {
    var user1 = matriz[0]
    var user2 = matriz[1]
    var sumatorio = 0
    for (let i = 0; i < user1.length; i++) {
        sumatorio += Math.pow(user1[i] - user2[i], 2)
    }

    return Math.sqrt(sumatorio)

}
