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
    const obj = JSON.parse(JSON.stringify(data));

    let corpus: Map<string, string> = new Map(Object.entries(obj));
    console.log(corpus);
}


// EXAMPLE----------------------------------------------------------
// const object1 = {
    //     a: 'somestring',
    //     b: 42
    //   };
    
    //   for (const [key, value] of Object.entries(object1)) {
        //     console.log(`${key}: ${value}`);
        //   }
        
        // expected output:
        // "a: somestring"
        // "b: 42"
// EXAMPLE----------------------------------------------------------


let file = './src/fichero/documento_01.txt';
let stopFile = './src/fichero/stop_words_en.txt';
let corpusFile = './src/fichero/corpus_en.txt';

let countWord = wordsCount(readFiles(file));
countWord = removeStopWords(countWord, stopFile);
changeCorpus(countWord, corpusFile);