import readFiles from "./index";
import wordsCount from "./wordsCount";

import * as fs from 'fs';

/**
 * __removeStopWords__
 * The function to remove words contained in a stop words (word list)
 * @docWords a object Map that contained all words with their words count
 * @stopFile a file that contained a stop words (word list)
 * @return an array of Maps that no contained any word of stop words (word list) 
 */
export default function removeStopWords(docWords: Map<string, number>[], stopFile: string) {
    
    // read stopFile
    const data = fs.readFileSync(stopFile, 'utf-8');
    // get the stop word list
    const stopWords = data.split(/\r?\n/);

    docWords.forEach((doc, index) => {
        doc.forEach((_, word) => {
            // if find any stop words in document, delete the word.
            if (stopWords.find((stop) => {  return stop == word; }) != undefined) {
                docWords[index].delete(word);
            }
        })
    });
    return docWords;
}

let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';

let countWord = wordsCount(readFiles(file));
countWord = removeStopWords(countWord, stopFile);