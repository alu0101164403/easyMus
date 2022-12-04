
export function frecPonderada(corpus: Map<string, number>[]) {
    // calcula tf-idf para cada palabra en su documento
    // para tf > 0 = 1 + log10(tf)
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
    let tfIdf:Map<string, number> = new Map();

    // las palabras en tf y idf son las mismas (si esta bien hecho)
    tf.forEach(doc => {
        doc.forEach((value, key) => {
            doc.set(key, Number((idf.get(key)! * value).toFixed(2)));
        });
    });

    return tf;
}

// similitud coseno entre documentos
export function coseno(tfIdf:Map<string, number>[]) {
    
}

export default {
    frecPonderada,
    IDF,
    tfIdf,
    coseno
}