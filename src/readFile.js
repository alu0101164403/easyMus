import fs from 'fs'


function readFile () {
    // if(!nameFile) {
    //     return 'Error, no se ha encontrado el fichero.'
    // }

    var matrix = [];
    const output = fs.readFileSync('../input/example1.txt').toString()
    output.split(/\r?\n/).forEach(line =>  {

        // var vector = line.split(" ")
        var vector = line.replace("-", "-1");
        // vector.replace("-", "-1"); // "_xxx"
        vector.replace(" ", "");
        console.log(typeof(vector))
        // vector.forEach(item => {
        //     matrix.push(parseInt(item))
        // })
        console.log(vector)


        // var vectorInt = [
        // vector.forEach((num) => {
        //     vectorInt.push(Number(num))
        // })

        // console.log(vector)
        // console.log("\n")
        // matrix.push(vector)

        // console.log(`Line from file: ${line}`);
      });

    // console.log(matrix)
    // var matrix = output.toString()



}

// readFile('../input/exaple1.txt')
readFile()