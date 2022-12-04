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
let f1 = './src/fichero/documento_01.txt';
let f2 = './src/fichero/documento_02.txt';
let f3 = './src/fichero/documento_03.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';
// se lee un fichero
let documents = (0, readFile_1.readFiles)(f2);
// se cuenta las ocurrencias de cada palabra
let countWords = (0, wordsCount_1.default)(documents);
// eliminar stop words
let stopWords = (0, readFile_1.readFileInWordList)(stopFile);
let removeWords = (0, removeStopWords_1.default)(countWords, stopWords);
// lematizacion
let corpusWords = (0, readFile_1.readAndParseJson)(corpusFile);
let corpus = (0, changeCorpus_1.default)(countWords, corpusWords);
// tf normalizado 
let tf = (0, calculations_1.frecPonderada)(corpus);
// aplicar idf
let idf = (0, calculations_1.IDF)(tf);
// tf-idf
let tf_Idf = (0, calculations_1.tfIdf)(tf, idf);
console.log(tf_Idf);
// similaridad coseno
let simCos = (0, calculations_1.coseno)(tf_Idf);
//console.log(simCos);
