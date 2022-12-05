
// calcula frecuencia, tf, normalizada
export function frecPonderada(corpus: Map<string, number>[]) {

    // en este caso todas las palabras aparecen al menos 1 vez, en caso contrario no 
    // podrian estar en la lista (por eso no se hace la comprobacion)
    corpus.forEach((document) => {
        document.forEach((value, key) => {
            document.set(key, 1 + Math.log10(value));
        });
    });

    return corpus;
}

// calcula el numero de documentos en los que aparece cada palabra
function DF(corpus: Map<string, number>[]) {
    let df: Map<string, number> = new Map(); // palabras con nº de docuemntos en los que aparece
    corpus.forEach((document) => {
        document.forEach((value, key) => {
            // nº documentos en que aparece la palabra
            let newValue = df.get(key) ? (value + 1) : 1;
            df.set(key, newValue);
        });
    });

    return df;
}

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

// como de importante es una palabra en un docuemento de una coleccion
export function tfIdf(tf:Map<string, number>[], idf:Map<string, number>) {
    // las palabras en tf y idf son las mismas (si esta bien hecho)
    tf.forEach(doc => {
        doc.forEach((value, key) => {
            doc.set(key, Number((idf.get(key)! * value).toFixed(2)));
        });
    });

    return tf;
}

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

export default {
    frecPonderada,
    IDF,
    tfIdf,
    coseno
}