import readFiles from "./index";
import wordsCount from "./wordsCount";

import * as fs from 'fs';

/**
 * 
 */
export default function removeStopWords(docWords: Map<string, number>[], stopFile: string) {
    const data = fs.readFileSync(stopFile, 'utf-8');
    const stopWords = data.split(/\r?\n/);
    docWords.forEach((doc, index) => {
        doc.forEach((_, word) => {
            if (stopWords.find((stop) => {  return stop == word;    }) != undefined) {
                docWords[index].delete(word);
            }
        })
    });
    console.log(docWords);
}

let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';

let countWord = wordsCount(readFiles(file));
removeStopWords(countWord, stopFile);