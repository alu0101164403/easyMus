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

## 