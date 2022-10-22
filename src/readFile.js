import fs from 'fs'


function readFile () {

  const file = '../input/example1.txt';
  var matrix = [];

  fs.readFile(file, 'utf8', (error, datos) => {
    if (error) throw error;
    
    var matrix = [];
    const file = fs.readFileSync('../input/example1.txt').toString()
    // read line by line
    file.split(/\r?\n/).forEach(line =>  {
      var vector = line.replace("-", "-1").trim().split(" ");
      var vectorInt = []
      // save string like number
      vector.forEach(item => {
        vectorInt.push(Number(item))
      })
      matrix.push(vectorInt)
    });

    console.log(matrix)
  });

}

readFile()