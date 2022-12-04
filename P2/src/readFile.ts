import * as fs from 'fs';


/**
 * __readFiles__
 * Read files line by line and remove elements (, and .) 
 * @file the document that need to read
 * @return a matrix of string
 */
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

export function readFileInWordList(file: string) {

    // read stopFile
    const data = fs.readFileSync(file, 'utf-8');
    // get the stop word list
    const stopWords = data.split(/\r?\n/);

    return stopWords;
}

export function readAndParseJson(file: string) {
  // read corpusFile
  const data: string = fs.readFileSync(file, 'utf-8');
  const obj = JSON.parse(data.toString());

  return obj;
}


export default {
  readFiles,
  readFileInWordList,
  readAndParseJson
}