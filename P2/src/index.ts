import wordsCount from "./wordsCount";
import { readFiles, readFileInWordList, readAndParseJson } from "./readFile";
import removeStopWords from "./removeStopWords";
import changeCorpus from "./changeCorpus";
import {coseno, IDF, frecPonderada, tfIdf} from "./calculations";


let f1 = './src/fichero/documento_01.txt';
let f2 = './src/fichero/documento_02.txt';
let f3 = './src/fichero/documento_03.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';

// se lee un fichero
let documents: string[][] = readFiles(f2);

// se cuenta las ocurrencias de cada palabra
let countWords: Map<string, number>[] = wordsCount(documents);

// eliminar stop words
let stopWords: string[] = readFileInWordList(stopFile);

let removeWords: Map<string, number>[] = removeStopWords(countWords, stopWords);


// lematizacion
let corpusWords = readAndParseJson(corpusFile);
let corpus = changeCorpus(countWords, corpusWords);

// tf normalizado 
let tf = frecPonderada(corpus);

// aplicar idf
let idf = IDF(tf);

// tf-idf
let tf_Idf = tfIdf(tf, idf);
console.log(tf_Idf)

// similaridad coseno
let simCos = coseno(tf_Idf);
//console.log(simCos);