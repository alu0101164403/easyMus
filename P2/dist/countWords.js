"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWords = void 0;
const index_1 = __importDefault(require("./index"));
function countWords(documents) {
    return documents.reduce((prev, nxt) => {
        prev[nxt] = (prev[nxt] + 1) || 1;
        return prev;
    }, {});
}
exports.countWords = countWords;
let file = './src/fichero/documento_01.txt';
let data = (0, index_1.default)(file);
countWords(data);
