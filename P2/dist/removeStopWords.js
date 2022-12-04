"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * __removeStopWords__
 * The function to remove words contained in a stop words (word list)
 * @docWords a object Map that contained all words with their words count
 * @stopFile a file that contained a stop words (word list)
 * @return an array of Maps that no contained any word of stop words (word list)
 */
function removeStopWords(docWords, stopWords) {
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
