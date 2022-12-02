"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const wordsCount_1 = __importDefault(require("./wordsCount"));
const fs = __importStar(require("fs"));
/**
 * __removeStopWords__
 * The function to remove words contained in a stop words (word list)
 * @docWords a object Map that contained all words with their words count
 * @stopFile a file that contained a stop words (word list)
 * @return an array of Maps that no contained any word of stop words (word list)
 */
function removeStopWords(docWords, stopFile) {
    // read stopFile
    const data = fs.readFileSync(stopFile, 'utf-8');
    // get the stop word list
    const stopWords = data.split(/\r?\n/);
    docWords.forEach((doc, index) => {
        doc.forEach((_, word) => {
            // if find any stop words in document, delete the word.
            if (stopWords.find((stop) => { return stop == word; }) != undefined) {
                docWords[index].delete(word);
            }
        });
    });
    return docWords;
}
exports.default = removeStopWords;
let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let countWord = (0, wordsCount_1.default)((0, index_1.default)(file));
countWord = removeStopWords(countWord, stopFile);
