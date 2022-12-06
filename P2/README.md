# Sistemas de recomendación. Modelos Basados en el Contenido

```
>>  PROYECTO: Sistemas de recomendación. Modelos Basados en el Contenido
>>  COMPONENTES: XueMei Lin - alu0101164403@ull.edu.es	
>>               Ainoa Iglesias Dasilva - alu0101164403@ull.edu.es
>>               Karina Kalwani Israni - alu0101109046@ull.edu.es
>>  UNIVERSIDAD: Universidad de La Laguna
>>  ASIGNATURA:  GESTIÓN DEL CONOCIMIENTO EN LAS ORGANIZACIONES
>>  VERSION:     2.0.0
>>  GITHUB:      https://github.com/alu0101164403/easyMus.git
```

## 1. src/readFiles.ts

### 1.1 readFiles
La funcion **readFiles** realiza la lectura del fichero de texto, eliminando el signo de la puntacion y la goma, y por ultimo,  cada linea del fichero se convierte en un "documento". La funcion devuelve una matrix donde guarda cada "documento" como un vector, y dentro del vector es otro vector que contiene palabras del "documento" (cada fila). 

```
export function readFiles(file: string) {
    let documents: string[][] = [];

    try {
      // read contents of the file
      const data = fs.readFileSync(file, 'utf-8');
    
      // remove punctuation marks and separate by lines and by words
      data.split(/\r?\n/).forEach(line => {
          let document: string[] = line.replaceAll(",", "").replaceAll(".", "").toLowerCase().split(" ");
          documents.push(document);
      });
    } catch (err) {
      console.error(err);
    }

    return documents;
}
```

### 1.2 readFileInWordList
La funcion **readFileInWordList** leer el fichero de stopFile (donde contiene una lista de palabras), simplemente obtener todas las palabras y convierte en un vector de tipo string.

```
export function readFileInWordList(file: string) {

    // read stopFile
    const data = fs.readFileSync(file, 'utf-8');
    // get the stop word list
    const stopWords = data.split(/\r?\n/);

    return stopWords;
}
```

### 1.3 readAndParseJson
La funcion readAndParseJson realiza la lectura del fichero corpus, tambien contiene una lista de palabras. donde se trabaja para sustituir el contenido del fichero principal. Devuelve un objeto JSON.

```
export function readAndParseJson(file: string) {
  // read corpusFile
  const data: string = fs.readFileSync(file, 'utf-8');
  const obj = JSON.parse(data.toString());

  return obj;
}
```

## 2. changeCorpus.ts

### 2.1 changeCorpus
La funcion **changeCorpus** cambia todas las palabras que contiene el documento sustitutyendo a las palabras de corpus. Por ejemplo, si se encuantra un "doing" en el fichero, hay que convertir la palabra "doing" en "do". Recorre cada documento, si encuantra palabras que estan en la lista de corpus, cambia las palabras originales a la palabras de corpus, al final eliminando las palabras originales.

```
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
```

## 3.removeStopWords.ts

### 3.1 removeStopWords
La funcion **removeStopWords** elimina todas las palabras que se encuentra en una lista de palabras (stopFile). Recorre cada documento, si se encuentra las palabras que coincide con la lista, elimina directamente. la funcion devuelve un objecto de tipo Map que no contiene ninguna palabra de la lista de stopWords(stopFile)

```
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
```

## 4. wordsCount.ts

### 4.1 wordsCount
La funcion **wordsCount** numera las veces de las palabras que contiene en cada documento. Recorre cada docuemnto, compara cada palabra que si ya existe en el objecto Map, si no existe, inicia el contador a 1, en caso contrario, aumenta el contador.

```
export default function wordsCount(documents: string[][]) {

    // Create a new object Array to save Maps to save all document with their key and value
    let countWord: Map<string, number>[] = new Array(documents.length);

    // For all documents to realize words count
    documents.forEach((doc, index) => {

        // for every document create a new object Map
        countWord[index] = new Map();

        // run every document to realize words count
        doc.forEach((word) => {
            // if the word is not exists in the object Map, set the new word and init word count 1
            if (!countWord[index].has(word))
                countWord[index].set(word, 1);
            // else word count +1 
            else {
                countWord[index].set(word, countWord[index].get(word)! + 1);
            }
        });
    });
    return countWord;
}
```

## 5.calculations.ts

### 5.1 frecPonderada
La funcion realiza el calculo de la frecuencia de cada palarbra, la frecuancia de palabra inicia a 1, puesto que todas las palabras aparecen al menos 1 vez. La funcion devuelve un objecto Map donde guarda las palabras y sus frecuencias 
```
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
```

### 5.2 DF
La funcion calcula el numero de documento s en los que aparece cada palabra, crea un nuovo Map para guardar palabras con nº de docuemntos en los que aparece, si la palabra que se encuentra ya esta guardada en el Map llamad df, entonces se suma su frecuencia, en otro caso, inicia a 1.
```
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
```

### 5.3 IDF
La funcion realiza el calculo de la frecuencia inversa de cada palabra. La frecuencia se calcula mediante con logaritmo del tamaño del documento dividiendo a la frecuencia de cada valor.
```
export function IDF(corpus: Map<string, number>[], df:Map<string, number> = DF(corpus) ) {
    // numero de documentos
    let size: number = corpus.length;
    // idf = log(size / dfx), para cada palabra 
    df.forEach((value, key) => {
        df.set(key, Number(Math.log(size / value).toFixed(2)));
    });

    return df;
}
```

### 5.4 tfIdf
La funcion tdIdf calcula la imporancia de una palabra en un documento de una coleccion. hace una copia de corpus, y luego recorre para guarda el resultado de la multiplicacion de tf * idf.  
```
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
```
### 5.5 coseno
La funcion coseno calcula la similitud coseno entre documentos. Calcula el vector normalizado y su tamaño para cada documento, para calcular la similitud recorre el vector normalizada dos veces a la vez para compara con dos documentos del vector, si se encuentra la misma palabra, se suma el numero de similitud (**auxSim**), al final de la funcion devuelve cada documento con la simitud con otro documento.
```
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
```