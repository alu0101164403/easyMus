/**
 * __removeStopWords__
 * The function to remove words contained in a stop words (word list)
 * @docWords a object Map that contained all words with their words count
 * @stopFile a file that contained a stop words (word list)
 * @return an object Map that no contained any word of stop words (word list) 
 */
export default function removeStopWords(docWords: Map<string, number>[], stopWords: string[]) {

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

