"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coseno = exports.tfIdf = exports.IDF = exports.frecPonderada = void 0;
function frecPonderada(corpus) {
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
exports.frecPonderada = frecPonderada;
// calcula el numero de documentos en los que aparece cada palabra
function DF(corpus) {
    let df = new Map(); // palabras con nº de docuemntos en los que aparece
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
function IDF(corpus, df = DF(corpus)) {
    // numero de documentos
    let size = corpus.length;
    // idf = log(size / dfx), para cada palabra 
    df.forEach((value, key) => {
        df.set(key, Number(Math.log(size / value).toFixed(2)));
    });
    return df;
}
exports.IDF = IDF;
// como de importante es una palabra en un docuemento de una coleccion
function tfIdf(tf, idf) {
    let tfIdf = new Map();
    // las palabras en tf y idf son las mismas (si esta bien hecho)
    tf.forEach(doc => {
        doc.forEach((value, key) => {
            doc.set(key, Number((idf.get(key) * value).toFixed(2)));
        });
    });
    return tf;
}
exports.tfIdf = tfIdf;
// similitud coseno entre documentos
function coseno(tfIdf) {
}
exports.coseno = coseno;
exports.default = {
    frecPonderada,
    IDF,
    tfIdf,
    coseno
};
