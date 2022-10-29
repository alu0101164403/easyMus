import fs from 'fs';

export default function readFile (file) {
  var matrix_return = fs.readFileSync(file, 'utf8', (error, datos) => {
    if (error) throw error;
  });

  var matrix = [];
  // read line by line
  matrix_return.split(/\r?\n/).forEach(line => {
    var vector = line.replaceAll("-", "-1").trim().split(" ");
    var vectorInt = [];
    // save string like number
    vector.forEach(item => {
      vectorInt.push(Number(item));
    })
    matrix.push(vectorInt);
  });
  return matrix;
}
