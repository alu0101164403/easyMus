import readFiles from "./index";

export default function countWords(documents: string[][]) {
    // return documents.reduce((prev, nxt) => {
    //     prev[nxt] = (prev[nxt] + 1) || 1;
    //     return prev;
    // }, {});
    let countWord: Map<string, number>[] = new Array(documents.length);
    documents.forEach((doc, index) => {
        countWord[index] = new Map();
        doc.forEach((word) => {
            if (!countWord[index].has(word))
                countWord[index].set(word, 1);
            else {
                countWord[index].set(word, countWord[index].get(word)! + 1);
            }
        });
    })
    return countWord;
}

let file = './src/fichero/documento_01.txt';

let countWord = countWords(readFiles(file));
console.log(countWord);