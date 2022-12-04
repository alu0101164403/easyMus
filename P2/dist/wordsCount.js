"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * __wordsCount_
 * The function to realize the words count
 * @documents all documents that need to realize words count
 * @return a object map root that contains the key (words - type sring) and value (words count - type number)
 */
function wordsCount(documents) {
    // Create a new object Array to save Maps to save all document with their key and value
    let countWord = new Array(documents.length);
    // For all documents to realize words count
    documents.forEach((doc, index) => {
        // for every document create a new object Map
        countWord[index] = new Map();
        // run every document to realize words count
        doc.forEach((word) => {
            // if the word is not exists in the object Map, set the new word and init word count 1
            if (!countWord[index].has(word))
                countWord[index].set(word, 1);
            // else word count +1 
            else {
                countWord[index].set(word, countWord[index].get(word) + 1);
            }
        });
    });
    return countWord;
}
exports.default = wordsCount;
