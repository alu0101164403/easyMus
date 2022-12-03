import readFiles from "./index";
import wordsCount from "./wordsCount";
import removeStopWords from "./removeStopWords";
import changeCorpus from "./changeCorpus";

let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';

export default function calculateTF(countWord: Map<string, number>[]) {
    let tf: Map<string, number>[] = new Array(countWord.length);
}

let countWord = wordsCount(readFiles(file));
countWord = removeStopWords(countWord, stopFile);
countWord = changeCorpus(countWord, corpusFile);
calculateTF(countWord);