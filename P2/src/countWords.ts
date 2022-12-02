import readFiles from "./index";

export function countWords (documents: string[]) {
    return documents.reduce((prev, nxt) => {
        prev[nxt] = (prev[nxt] + 1) || 1;
        return prev;
    }, {});
}

let file = './src/fichero/documento_01.txt';

let data = readFiles(file)
countWords(data);