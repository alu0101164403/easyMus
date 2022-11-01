import promptSync from 'prompt-sync'; 
import app from './app.js';

/*
--------------------- PRÁCTICA 1 - GCO - MÉTODOS DE FILTRADO COLABORATIVO ---------------------------
Para ejecutar el programa:
    - 'node readConsole.js'

-----------------------------------------------------------------------------------------------------
*/


function readConsole() {
    const prompt = promptSync(); 
    const numVecinos = prompt('Selecciona el numero de vecinos que deseas obtener:');

    console.log('1. Pearson \n2. Distancia Coseno \n3. Distancia Euclidea.')
    const metrica = prompt("Selecciona la metrica:");

    console.log('1. Prediccion simple \n2. Prediccion Diferencia con Media.')
    const prediccion = prompt("Selecciona la prediccion:");

    console.log('Los ficheros proporcionados, han sido obtenidos del enlace de github proporcionado en el enunciado de la práctica.')
    console.log('Ficheros disponibles:\n1. utility-matrix-5-10-5. \n2. utility-matrix-10-25-3.\n3. utility-matrix-25-100-5. \n4. utility-matrix-50-250-6.\n5. utility-matrix-100-1000-4. \n6. Ejemplo teoria.')
    const ficheros = prompt("Selecciona fichero:");

    let met = '', pred = '', file = '';

    switch(metrica) {
        case '1':
            met = 'Pearson';
        break;
        case '2':
            met = 'Distancia Coseno';
        break;
        case '3':
            met = 'Distancia Euclidea';
        break;
        default:
    }
    switch(prediccion) {
        case '1':
            pred = 'prediccionSimple';
        break;
        case '2':
            pred = 'prediccionDiferenciaMedia';
        break;
        default:
    }
    switch(ficheros) {
        case '1':
            file = '../input/utility-matrix-5-10-5.txt';
        break;
        case '2':
            file = '../input/utility-matrix-10-25-3.txt';
        break;
        case '3':
            file = '../input/utility-matrix-25-100-5.txt';
        break;
        case '4':
            file = '../input/utility-matrix-50-250-6.txt';
        break;
        case '5':
            file = '../input/utility-matrix-100-1000-4.txt';
        break;
        case '6':
            file = '../input/ejemploPrediccion.txt';
        break;
        default:
    }

    app(file, numVecinos, met, pred);
}

readConsole();
