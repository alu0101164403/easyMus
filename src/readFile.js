import fs from 'fs'


function readFile () {

  const file = '../input/example1.txt';
  // const file = '../input/utility-matrix-10-25-2.txt';

  fs.readFile(file, 'utf8', (error, datos) => {
    if (error) throw error;
    else {
      var matrix = [];
      // read line by line
      datos.split(/\r?\n/).forEach(line =>  {
        
        var vector = line.replaceAll("-", "-1").trim().split(" ");
        var vectorInt = []
        // save string like number
        vector.forEach(item => {
          vectorInt.push(Number(item))
        })
        matrix.push(vectorInt)
      });
  
      console.log(matrix)
    }    
  });
}


readFile()



