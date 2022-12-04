"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function changeCorpus(countWords, obj) {
    let corpus = new Map(Object.entries(obj));
    countWords.forEach((doc, index) => {
        doc.forEach((value, key) => {
            if (corpus.has(key)) {
                const change = corpus.get(key);
                if (doc.has(change)) {
                    doc.set(change, value + doc.get(change));
                    doc.delete(key);
                }
                else {
                    doc.set(corpus.get(key), value);
                    doc.delete(key);
                }
            }
        });
    });
    return countWords;
}
exports.default = changeCorpus;
