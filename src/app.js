import readFile from "./readFile.js"
import {Pearson, distanciaCoseno, distanciaEuclidea}  from "./metricas.js"
import matrizDosUsuarios from "./arreglosMatriz.js";
// import {prediccionDiferenciaMedia, prediccionSimple} from './predicciones.js';

function abc(file, n_vecinos, metrica, prediccion) {
    var matriz = readFile(file)
    console.log(matriz)
    // 1º. que item desconocido queremos calcular
    // 2º. calcular similitudes con el resto de usuarios (meter en map indicando  que usuario pertenece)
    // 3º. escoger vecinos (segun metrica escogida)
    // 4º. calcular prediccion
    // 5º. meter valoracion en la matriz original
    // 6º. repetir

    //var i = 0;
    // var found = false;
    
    // recorre matriz original
    // while (i < matriz.length) {
    //     // recorre usuario buscando guion
    //     for (let j = 0; j < matriz[i].length; j++) {
    //         // cuando encontramos un guion en la matriz original
    //         if (j === -1) {
    //             found = true;
    //             // se recorre todos los vecinos calculando similitud
    //             for (var k = 0; k < matriz.length - 1; k++) {
    //                 // si no es el mismo usuario del que queremos calcular la valoracion
    //                 // calcula la similitud
    //                 if (k !== j) {
    //                     // escoger los dos usuarios a comparar (el del item desconocido y otro)
    //                     var sub_matriz = matrizDosUsuarios(matriz[j], matriz[k]);
    //                     // calcular similitudes
    //                     var resultMetrica = new Map();
    //                     switch(metrica) {
    //                         case 'Pearson':
    //                             resultMetrica.set(k, Pearson(sub_matriz));
    //                             break;
    //                         case 'Distancia Coseno':
    //                             resultMetrica.set(k, distanciaCoseno(sub_matriz));
    //                             break;
    //                         case 'Distancia Euclidea':
    //                             resultMetrica.set(k, distanciaEuclidea(sub_matriz));  
    //                         break;
    //                         default:
    //                     }
    //                     console.log(resultMetrica)
    //                 }
    //             }
    //             // var map_vecinos = vecinos(resultMetrica, metrica, n_vecinos);
    //             // var valoracion;
    //             // switch(prediccion) {
    //             //     case 'prediccionSimple':
    //             //         valoracion = prediccionSimple(matriz, map_vecinos, j);
    //             //         break;
    //             //     case 'prediccionDiferenciaMedia':
    //             //         valoracion =prediccionDiferenciaMedia(matriz, map_vecinos, j);
    //             //         break;
    //             //     default:
    //             // }
    //             // matriz[j] = valoracion;
    //         }
    //     }
    //     if (found === false) {
    //         i++;
    //     }
    // }
    // console.log(matriz);
}




// function vecinos(mapSimilitudes, metrica, n_vecinos) {
//     var vecinos;
//     if (metrica === 'Distancia Euclidea') {
//         const mapSort = new Map([...mapSimilitudes.entries()].sort());
//         var i = 0;
//         while (i < n_vecinos) {
//             vecinos.set(mapSort[i]);
//             i++;
//         }
//     } else {
//         const mapSort = new Map([...mapSimilitudes.entries()].sort((a, b) => b[1] - a[1]));
//         var i = 0;
//         while (i < n_vecinos) {
//             vecinos.set(mapSort[i]);
//             i++;
//         }
//     }
//     return vecinos;
// }

const file = '../input/example1.txt';
abc(file, 3, "Person", "prediccionSimple")