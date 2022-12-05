"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wordsCount_1 = __importDefault(require("./wordsCount"));
const readFile_1 = require("./readFile");
const removeStopWords_1 = __importDefault(require("./removeStopWords"));
const changeCorpus_1 = __importDefault(require("./changeCorpus"));
const calculations_1 = require("./calculations");
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
    let documents = (0, readFile_1.readFiles)(`./src/fichero/` + ff);
    // se cuenta las ocurrencias de cada palabra
    let countWords = (0, wordsCount_1.default)(documents);
    // eliminar stop words
    let stopWords = (0, readFile_1.readFileInWordList)(stopFile);
    let removeWords = (0, removeStopWords_1.default)(countWords, stopWords);
    // lematizacion
    let corpusWords = (0, readFile_1.readAndParseJson)(corpusFile);
    let corpus = (0, changeCorpus_1.default)(removeWords, corpusWords);
    // tf normalizado 
    let tf = (0, calculations_1.frecPonderada)(corpus);
    // aplicar idf
    let idf = (0, calculations_1.IDF)(tf);
    // tf-idf
    let tf_Idf = (0, calculations_1.tfIdf)(tf, idf);
    // similaridad coseno
    let simCos = (0, calculations_1.coseno)(tf);
    // MOSTRAR DATOS COSENO
    console.log('                           ----SIMILITUD COSENO ENTRE DOCUMENTOS----');
    let cabecera = '      ';
    for (let i = 0; i < documents.length; i++) {
        cabecera += `  Doc${i}  `;
    }
    console.log(cabecera);
    let i = 0;
    while (i < documents.length) {
        let line = [`Doc${i}  `];
        // eslint-disable-next-line no-loop-func
        simCos.forEach((value, key) => {
            if (key[0] === i) {
                line.push(value + '  ');
            }
        });
        line.splice(i + 1, 0, '------  ');
        console.log(line.toString().replaceAll(',', '').replaceAll(' 0 ', ' 0.0000 '));
        i = i + 1;
    }
    // MOSTRAR DATOS DE DOCUMENTOS
    tf.forEach((doc, index) => {
        console.log(`\n\nDOCUMENTO ${index}`);
        console.log('Termino    Tf      IDF     TF-IDF');
        let info = [];
        doc.forEach((value, key) => {
            info.push(key + '      ' + value.toString() + '    ' + idf.get(key)?.toString() + '    ' + tf_Idf[index].get(key)?.toString() + '    ');
        });
        info.forEach((inf) => {
            console.log(inf);
        });
    });
    function promptSync() {
        throw new Error("Function not implemented.");
    }
}
main();
