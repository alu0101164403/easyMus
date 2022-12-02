"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
function countWords(documents) {
    // return documents.reduce((prev, nxt) => {
    //     prev[nxt] = (prev[nxt] + 1) || 1;
    //     return prev;
    // }, {});
    let countWord = new Array(documents.length);
    documents.forEach((doc, index) => {
        countWord[index] = new Map();
        doc.forEach((word) => {
            if (!countWord[index].has(word))
                countWord[index].set(word, 1);
            else {
                countWord[index].set(word, countWord[index].get(word) + 1);
            }
        });
    });
    return countWord;
}
exports.default = countWords;
let file = './src/fichero/documento_01.txt';
let countWord = countWords((0, index_1.default)(file));
