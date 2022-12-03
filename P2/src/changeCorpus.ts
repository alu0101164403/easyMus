import readFiles from "./index";
import wordsCount from "./wordsCount";
import removeStopWords from "./removeStopWords";

import * as fs from 'fs';

/**
 * 
 */
export default function changeCorpus(countWord: Map<string, number>[], corpusFile: string) {
    // read corpusFile
    const data = fs.readFileSync(corpusFile, 'utf-8');
    const obj = JSON.parse(data.toString());

    let corpus: Map<string, string> = new Map(Object.entries(obj));
    countWord.forEach((doc, index) => {
        doc.forEach((value, key) => {
            if(corpus.has(key)) {
                const change = corpus.get(key)!
                if (doc.has(change)) {
                    doc.set(change, value + doc.get(change)!);
                    doc.delete(key);
                } else {
                    doc.set(corpus.get(key)!, value);
                    doc.delete(key);
                }
            }
        });
    });
    return countWord;
}



let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';

let countWord = wordsCount(readFiles(file));
countWord = removeStopWords(countWord, stopFile);
countWord = changeCorpus(countWord, corpusFile);
console.log(countWord);