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


### 5.2 DF
### 5.3 IDF
### 5.4 tfIdf
### 5.5 coseno