import readFile from "./readFile.js"
import {Pearson, distanciaCoseno, distanciaEuclidea}  from "./metricas.js"
import matrizDosUsuarios from "./arreglosMatriz.js";
import {prediccionDiferenciaMedia, prediccionSimple} from './predicciones.js';
import average from './operators.js'

/*
--------------------- PRÁCTICA 1 - GCO - MÉTODOS DE FILTRADO COLABORATIVO ---------------------------
Para ejecutar el programa:
    - 'node app.js'

-----------------------------------------------------------------------------------------------------
*/

/*
1º. que item desconocido queremos calcular
2º. calcular similitudes con el resto de usuarios (meter en map indicando  que usuario pertenece)
3º. escoger vecinos (segun metrica escogida)
4º. calcular prediccion
5º. meter valoracion en la matriz original
6º. repetir
*/


function app(file, n_vecinos, metrica, prediccion) {
    var matriz = readFile(file);
    console.log('Matriz inicial: \n', matriz);
    var i = 0;
    // necesario por si un mismo usuario tiene varios guiones
    var found = false;

    while (i < matriz.length) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === -1) {
                found = true;
                // se recorre todos los usuario calculando similitud con el buscado
                // si no es el mismo usuario del que queremos calcular la valoracion
                var resultMetrica = [];
                for (var k = 0; k < matriz.length; k++) {
                    if (i !== k) {
                        var sub_matriz = matrizDosUsuarios(matriz[i], matriz[k]);
                        resultMetrica.push({key: k, value: obtenerMetrica(metrica, sub_matriz)});
                    }
                } 
                var map_vecinos = obtenerVecinos(resultMetrica, metrica, n_vecinos);
                var valoracion = obtenerPrediccion(prediccion, matriz, map_vecinos, j, average(sub_matriz[0]));
                matriz[i][j] = parseInt(valoracion);
            }   
        }
        if (found === false) {
            i++;
        } else found = false;
    }
    console.log('matriz final', matriz);
}

function obtenerMetrica(metrica, sub_matriz) {
    switch(metrica) {
        case 'Pearson':
            return Pearson(sub_matriz);
        case 'Distancia Coseno':
            return distanciaCoseno(sub_matriz);
        case 'Distancia Euclidea':
            return distanciaEuclidea(sub_matriz);  
        default:
    }
}

function obtenerVecinos(mapSimilitudes, metrica, n_vecinos) {
    var simSort;
    if (metrica === 'Distancia Euclidea') {
        simSort = mapSimilitudes.sort();
        simSort = simSort.slice(0,n_vecinos);
    } else {
        simSort = mapSimilitudes.sort((a, b) => b.value - a.value);
        simSort = simSort.slice(0,n_vecinos);
    }
    const mapVecinos = new Map(
        simSort.map(object => {
            return [object.key, object.value];
        }),
    );
    return mapVecinos;
}

function obtenerPrediccion(prediccion, matriz, map_vecinos, j, averageU) {
    switch(prediccion) {
        case 'prediccionSimple':
            return prediccionSimple(matriz, map_vecinos, j);
        case 'prediccionDiferenciaMedia':
            return prediccionDiferenciaMedia(matriz, map_vecinos, j, averageU);
        default:
    }
}

// const file = '../input/example1.txt';
// // ejemplo 1
// app(file, 3, "Pearson", "prediccionSimple");
// // ejemplo 3
// const file2 = '../input/utility-matrix-10-25-2.txt';
// app(file2, 6, "Distancia Euclidea", "prediccionSimple");
// // ejemplo 4
// const file3 = '../input/utility-matrix-50-250-9.txt';
// app(file3, 6, "Distancia Euclidea", "prediccionSimple");
// // ejemplo 5
const file4 = '../input/utility-matrix-10-25-2.txt';
app(file4, 6, "Distancia Euclidea", "prediccionSimple");
