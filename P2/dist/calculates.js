"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("./readFile"));
const wordsCount_1 = __importDefault(require("./wordsCount"));
//import removeStopWords from "./removeStopWords";
//import changeCorpus from "./changeCorpus";
let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';
function calculateTF(countWord) {
    let tf = new Array(countWord.length);
}
exports.default = calculateTF;
let countWord = (0, wordsCount_1.default)((0, readFile_1.default)(file));
countWord = removeStopWords(countWord, stopFile);
countWord = changeCorpus(countWord, corpusFile);
calculateTF(countWord);
