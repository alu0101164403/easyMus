/**
 * __frecPonderada_
 * The function to realize calculate frecuency using tf
 * @corpus a list of words
 */
// calcula frecuencia, tf, normalizada
export function frecPonderada(corpus: Map<string, number>[]) {

    // en este caso todas las palabras aparecen al menos 1 vez, en caso contrario no 
    // podrian estar en la lista (por eso no se hace la comprobacion)
    corpus.forEach((document) => {
        document.forEach((value, key) => {
            document.set(key, Number((1 + Math.log10(value)).toFixed(2)));
        });
    });

    return corpus;
}

/**
 * __DF_
 * The function to realize calculate the number of document that contained every word appears
 * @corpus a list of words
 */
// calcula el numero de documentos en los que aparece cada palabra
function DF(corpus: Map<string, number>[]) {
    let df: Map<string, number> = new Map();
    corpus.forEach((document) => {
        document.forEach((value, key) => {
            // nº documentos en que aparece la palabra
            let newValue = df.get(key) ? (value + 1) : 1;
            df.set(key, newValue);
        });
    });

    return df;
}


/**
 * __IDF_
 * The function to realize calculate inverse document frequency
 * @corpus a list of words
 * @df a objecto map that contained all document with frecuency of very word
 */
// inverse document frequency
export function IDF(corpus: Map<string, number>[], df:Map<string, number> = DF(corpus) ) {
    // numero de documentos
    let size: number = corpus.length;
    // idf = log(size / dfx), para cada palabra 
    df.forEach((value, key) => {
        df.set(key, Number(Math.log(size / value).toFixed(2)));
    });

    return df;
}


/**
 * __tfIdf_
 * The function to realize calculate the importance of a words in a docuemnt
 * @corpus a list of words
 * @idf a objecto map wich contained documents and inverse document frequency
 */
export function tfIdf(corpus:Map<string, number>[], idf:Map<string, number>) {
    //copia profunda para no alterar datos
    let copyCorpus: Map<string, number>[] = [];
    corpus.forEach((map) => {
        copyCorpus.push(new Map(map));
    });
    //const copyCorpus = JSON.parse(JSON.stringify(corpus));
    // las palabras en tf y idf son las mismas (si esta bien hecho)
    copyCorpus.forEach(doc => {
        doc.forEach((value, key) => {
            doc.set(key, Number((idf.get(key)! * value).toFixed(2)));
        });
    });

    return copyCorpus;
}


/**
 * __coseno_
 * The function to realize calculate the similarity between 2 documents using cosine.
 * @return a object map that contained the similarity between every document with another docuemnt.
 */
// similitud coseno entre documentos
export function coseno(tf:Map<string, number>[]) {
    // se calcula el tamaño del vector normalizado para cada documento
    let vLength: number[] = new Array(tf.length).fill(0);
    tf.forEach((doc, i) => {
        for (const j of doc.values()) {
            vLength[i] += j ^ 2;
        }
        vLength[i] = Math.sqrt(vLength[i]);
    });

    // se calcula el vector normalizado
    let vNormal: Map<string, number>[] = new Array(tf.length).fill(new Map());
    tf.forEach((doc, i) => {
        let docNormal: Map<string, number> = new Map();
        doc.forEach((value, key) => {
            docNormal.set(key, value / vLength[i]);
        });
        vNormal[i] = docNormal;
    });

    let sim: Map<number[], number> = new Map();
    vNormal.forEach((doc1, i) => {
            vNormal.forEach((doc2, j) => {
                //if (i !== j && !sim.has(`Doc${j} - Doc${i}`)) {
                if (i !== j) {
                    let auxSim: number = 0;
                    doc1.forEach((value, key) => {
                        if (doc2.has(key)) {
                            auxSim += value * doc2.get(key)!;
                        }
                    });
                    sim.set([i, j], Number(auxSim.toFixed(4)));
                    //sim.set(`Doc${i} - Doc${j}`, Number(auxSim.toFixed(4)));
                }
            });
    });
    
    return sim;
}

/**
 * export functions
 */
export default {
    frecPonderada,
    IDF,
    tfIdf,
    coseno
}