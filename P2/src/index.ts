import { publicDecrypt } from 'crypto';
import * as fs from 'fs';

export default function readFiles (file: string) {
    let documents: any = [];
    let documentsByWords: string[] = [];
    let document: string[];

    try {
        // read contents of the file
        const data = fs.readFileSync(file, 'utf-8');
      
        // remove punctuation marks and separate by lines and by words
        data.split(/\r?\n/).forEach(line => {
            document = line.replaceAll(",", "").replaceAll(".", "").split(" ");
            documents.push(document);
        });

      } catch (err) {
        console.error(err);
      }
      console.log(documents)
      return documents;
      
}

