import readFile from "./readFile.js"
import {Pearson, distanciaCoseno, distanciaEuclidea}  from "./metricas.js"
import matrizDosUsuarios from "./arreglosMatriz.js";
//import {prediccionDiferenciaMedia, prediccionSimple} from './predicciones.js';

 // 1º. que item desconocido queremos calcular
// 2º. calcular similitudes con el resto de usuarios (meter en map indicando  que usuario pertenece)
// 3º. escoger vecinos (segun metrica escogida)
// 4º. calcular prediccion
// 5º. meter valoracion en la matriz original
// 6º. repetir
function app(file, n_vecinos, metrica, prediccion) {
    var matriz = readFile(file);
    console.log('Matriz inicial: \n', matriz);
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
                for (var k = 0; k < matriz.length - 1; k++) {
                    if (i !== k) {
                        // escoger los dos usuarios a comparar (el del item desconocido y otro)
                        var sub_matriz = matrizDosUsuarios(matriz[i], matriz[k]);
                        //console.log('s', sub_matriz)
                        var resultMetrica = new Map();
                        switch(metrica) {
                            case 'Pearson':
                                resultMetrica.set(k, Pearson(sub_matriz));
                            break;
                            case 'Distancia Coseno':
                                resultMetrica.set(k, distanciaCoseno(sub_matriz));
                            break;
                            case 'Distancia Euclidea':
                                resultMetrica.set(k, distanciaEuclidea(sub_matriz));  
                            break;
                            default:
                        }
                        var map_vecinos = obtenerVecinos(resultMetrica, metrica, n_vecinos);
                        console.log('map', map_vecinos)
                        var valoracion;

                        switch(prediccion) {
                            case 'prediccionSimple':
                                //valoracion = prediccionSimple(matriz, map_vecinos, j);
                            break;
                            case 'prediccionDiferenciaMedia':
                                //valoracion =prediccionDiferenciaMedia(matriz, map_vecinos, j);
                            break;
                            default:
                        }
                        matriz[i][j] = valoracion;
                        console.log('matriz intermedia', matriz)
                    }
                }   
            }
        }
        if (found === false) {
            i++;
        } else found = false;
    }
    //console.log('matriz final', matriz);
}


function obtenerVecinos(mapSimilitudes, metrica, n_vecinos) {
    var vecinos;
    // console.log(mapSimilitudes);
    if (metrica === 'Distancia Euclidea') {
        const mapSort = new Map([...mapSimilitudes.entries()].sort());
        var i = 0;
        while (i < n_vecinos) {
            vecinos.set(mapSort[i]);
            i++;
        }
    } else {
        const mapSort = new Map([...mapSimilitudes.entries()].sort((a, b) => b[1] - a[1]));
        var j = 0;
        while (j < n_vecinos) {
            vecinos.set(mapSort[i]);
            j++;
        }
    }
    // console.log(vecinos);
    return vecinos;
}

const file = '../input/example1.txt';
app(file, 3, "Pearson", "prediccionSimple");