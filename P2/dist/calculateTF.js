"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const wordsCount_1 = __importDefault(require("./wordsCount"));
const removeStopWords_1 = __importDefault(require("./removeStopWords"));
const changeCorpus_1 = __importDefault(require("./changeCorpus"));
let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';
function calculateTF(countWord) {
    let tf = new Array(countWord.length);
}
exports.default = calculateTF;
let countWord = (0, wordsCount_1.default)((0, index_1.default)(file));
countWord = (0, removeStopWords_1.default)(countWord, stopFile);
countWord = (0, changeCorpus_1.default)(countWord, corpusFile);
calculateTF(countWord);
