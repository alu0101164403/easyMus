
// matriz con el usuario bjetivo y con el que se calcula la similitud
// entran como array cada usuario

export default function matrizDosUsuarios(usu1, usu2) {
    var matriz = [];
    usu1.forEach((item, index) => {
        if (item === -1) {
            usu1.splice(index, 1);
            usu2.splice(index, 1);
        }
    });
    usu2.forEach((item, index) => {
        if (item === -1) {
            usu1.splice(index, 1);
            usu2.splice(index, 1);
        }
    });

    matriz.push(usu1);
    matriz.push(usu2);

    return matriz
}
