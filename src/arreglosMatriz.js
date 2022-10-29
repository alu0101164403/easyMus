
// matriz con el usuario bjetivo y con el que se calcula la similitud
// entran como array cada usuario

export default function matrizDosUsuarios(usuario1, usuario2) {
    var matriz = [];
    var usu1 = new Array(usuario1);
    var usu2 = new Array(usuario2);

    usuario1.forEach((item, index) => {
        if (item === -1) {
            usu1.splice(index, 1);
            usu2.splice(index, 1);
        }
    });

    usuario2.forEach((item, index) => {
        if (item === -1) {
            usu1.splice(index, 1);
            usu2.splice(index, 1);
        }
    });

    matriz.push(usu1);
    matriz.push(usu2);

    return matriz
}

// matrizDosUsuarios(usuario1, usuario2)
