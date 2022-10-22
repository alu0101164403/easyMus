import fs from 'fs'

export default function readFile (file) {
  // const file = '../input/example1.txt';
  // const file = '../input/utility-matrix-10-25-2.txt';
  var matrix = [];
  
//   (async() =>  {
//     try {
//        const result = await readFile('readme.txt', 'utf8');
//        console.log(result);
//     } catch(e) {
//        console.error(e);
//     }
//  })();

  fs.readFile(file, 'utf8', (error, datos) => {
    if (error) throw error;
    else {
      // read line by line
      datos.split(/\r?\n/).forEach(line => {
        var vector = line.replaceAll("-", "-1").trim().split(" ");
        var vectorInt = []
        // save string like number
        vector.forEach(item => {
          vectorInt.push(Number(item))
        })
        matrix.push(vectorInt)
      });
    }
    // console.log(matrix)
    return matrix
  });
  
  // console.log(matrix)
  // return matrix
}

// readFile('../input/example1.txt')