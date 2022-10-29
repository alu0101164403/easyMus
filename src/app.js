import readFile from "./readFile.js"
import {Pearson, distanciaCoseno, distanciaEuclidea}  from "./metricas.js"
import matrizDosUsuarios from "./arreglosMatriz.js";
import {prediccionDiferenciaMedia, prediccionSimple} from './predicciones.js';

 // 1º. que item desconocido queremos calcular
// 2º. calcular similitudes con el resto de usuarios (meter en map indicando  que usuario pertenece)
// 3º. escoger vecinos (segun metrica escogida)
// 4º. calcular prediccion
// 5º. meter valoracion en la matriz original
// 6º. repetir
function app(file, n_vecinos, metrica, prediccion) {
    var matriz = readFile(file);
    //console.log('Matriz inicial: \n', matriz);
    var i = 0;
    // necesario por si un mismo usuario tiene varios guiones
    var found = false;
    // recorre matriz original
    while (i < matriz.length) {
        // recorre usuarios buscando guion
        for (let j = 0; j < matriz[i].length; j++) {
            // cuando encontramos un guion en la matriz original
            if (matriz[i][j] === -1) {
                found = true;
                // se recorre todos los usuario calculando similitud con el buscado
                // si no es el mismo usuario del que queremos calcular la valoracion
                var resultMetrica = [];
                for (var k = 0; k < matriz.length; k++) {
                    var valoracion;
                    if (i !== k) {
                        // escoger los dos usuarios a comparar (el del item desconocido y otro)
                        var sub_matriz = matrizDosUsuarios(matriz[i], matriz[k]);
                        switch(metrica) {
                            case 'Pearson':
                                resultMetrica.push({key: k, value: Pearson(sub_matriz)});
                            break;
                            case 'Distancia Coseno':
                                resultMetrica.push({key: k, value: distanciaCoseno(sub_matriz)});
                            break;
                            case 'Distancia Euclidea':
                                resultMetrica.push({key: k, value: distanciaEuclidea(sub_matriz)});  
                            break;
                            default:
                        }
                    }
                } 
                var map_vecinos = obtenerVecinos(resultMetrica, metrica, n_vecinos);
                switch(prediccion) {
                    case 'prediccionSimple':
                        valoracion = prediccionSimple(matriz, map_vecinos, j);
                    break;
                    case 'prediccionDiferenciaMedia':
                        valoracion = prediccionDiferenciaMedia(matriz, map_vecinos, j);
                    break;
                    default:
                }
                matriz[i][j] = parseInt(valoracion);
            }   
        }
        if (found === false) {
            i++;
        } else found = false;
    }
    console.log('matriz final', matriz);
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
    // convierte en mapa de clave valor
    const mapVecinos = new Map(
        simSort.map(object => {
            return [object.key, object.value];
        }),
    );
    return mapVecinos;
}
    
    

const file = '../input/example1.txt';
// ejemplo 1
app(file, 3, "Pearson", "prediccionSimple");
// ejemplo 3
const file2 = '../input/utility-matrix-10-25-2.txt';
app(file2, 6, "Distancia Euclidea", "prediccionSimple");
// ejemplo 4
const file3 = '../input/utility-matrix-50-250-9.txt';
app(file3, 6, "Distancia Euclidea", "prediccionSimple");
// ejemplo 5
const file4 = '../input/utility-matrix-10-25-2.txt';
app(file4, 6, "Distancia Euclidea", "prediccionSimple");