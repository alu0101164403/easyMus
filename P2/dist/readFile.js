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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAndParseJson = exports.readFileInWordList = exports.readFiles = void 0;
const fs = __importStar(require("fs"));
/**
 * __readFiles__
 * Read files line by line and remove elements (, and .)
 * @file the document that need to read
 * @return a matrix of string
 */
function readFiles(file) {
    let documents = [];
    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'utf-8');
        // remove punctuation marks and separate by lines and by words
        data.split(/\r?\n/).forEach(line => {
            let document = line.replaceAll(",", "").replaceAll(".", "").toLowerCase().split(" ");
            documents.push(document);
        });
    }
    catch (err) {
        console.error(err);
    }
    return documents;
}
exports.readFiles = readFiles;
function readFileInWordList(file) {
    // read stopFile
    const data = fs.readFileSync(file, 'utf-8');
    // get the stop word list
    const stopWords = data.split(/\r?\n/);
    return stopWords;
}
exports.readFileInWordList = readFileInWordList;
function readAndParseJson(file) {
    // read corpusFile
    const data = fs.readFileSync(file, 'utf-8');
    const obj = JSON.parse(data.toString());
    return obj;
}
exports.readAndParseJson = readAndParseJson;
exports.default = {
    readFiles,
    readFileInWordList,
    readAndParseJson
};
