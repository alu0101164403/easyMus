import * as fs from 'fs';
export default function changeCorpus(countWords: Map<string, number>[], obj: JSON) {

    let corpus: Map<string, string> = new Map(Object.entries(obj));

    countWords.forEach((doc, index) => {
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

    return countWords;
}
