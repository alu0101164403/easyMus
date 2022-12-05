import wordsCount from "./wordsCount";
import { readFiles, readFileInWordList, readAndParseJson } from "./readFile";
import removeStopWords from "./removeStopWords";
import changeCorpus from "./changeCorpus";
import {coseno, IDF, frecPonderada, tfIdf} from "./calculations";

/*
--------------------- PRÁCTICA 2 - GCO - MODELOS BASADOS EN CONTENIDOS ------------------------------
Para ejecutar el programa:
    - 'node index.js --documents_0X'

-----------------------------------------------------------------------------------------------------
*/


function main() {
    const ff = 'documents_02.txt';

    let stopFile = './src/fichero/stop_words_en.txt';
    let corpusFile = './src/fichero/corpus_en.txt';

    // se lee un fichero
    let documents: string[][] = readFiles(`./src/fichero/`+ff);

    // se cuenta las ocurrencias de cada palabra
    let countWords: Map<string, number>[] = wordsCount(documents);

    // eliminar stop words
    let stopWords: string[] = readFileInWordList(stopFile);

    let removeWords: Map<string, number>[] = removeStopWords(countWords, stopWords);


    // lematizacion
    let corpusWords = readAndParseJson(corpusFile);
    let corpus = changeCorpus(removeWords, corpusWords);

    // tf normalizado 
    let tf = frecPonderada(corpus);

    // aplicar idf
    let idf = IDF(tf);

    // tf-idf
    let tf_Idf = tfIdf(tf, idf);
    

    // similaridad coseno
    let simCos = coseno(tf);

    // MOSTRAR DATOS COSENO
    console.log('                           ----SIMILITUD COSENO ENTRE DOCUMENTOS----');
    let cabecera: string = '      ';
    for (let i = 0; i < documents.length; i++) {
        cabecera += ` Doc${i}  `;
    }
    console.log(cabecera);

    let i: number = 0;
    while (i < documents.length) {
        let line: string[] = [`Doc${i}  `];
        // eslint-disable-next-line no-loop-func
        simCos.forEach((value, key) => {
            if(key[0] === i) {
                line.push(value + '  ');
            }
        });
        line.splice(i+1, 0, '------  ');
        console.log(line.toString().replaceAll(',', '').replaceAll(' 0 ', ' 0.0000 '));
        i = i + 1;
    }

    // MOSTRAR DATOS DE DOCUMENTOS
    tf.forEach((doc, index) => {
        console.log(`\n\nDOCUMENTO ${index}`);
        console.log('Termino    Tf      IDF     TF-IDF');
        let info: string[] = [];
        doc.forEach((value, key) => {
            info.push(key + '      ' + value.toString() + '    ' + idf.get(key)?.toString() + '    '  + tf_Idf[index].get(key)?.toString() + '    ');
        });
        info.forEach((inf) => {
            console.log(inf);
        });
    });
}

main();
