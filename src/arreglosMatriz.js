
// matriz con el usuario bjetivo y con el que se calcula la similitud
// entran como array cada usuario
// var usuario1 = [ 5, -1, 4, 4, -1 ];
// var usuario2 = [ 3, 1, -1, 3, 3 ];

export default function matrizDosUsuarios(usuario1, usuario2) {
    var matriz = [];

    usuario1.forEach((item, index) => {
        if (item === -1) {
            usuario1.splice(index, 1);
            usuario2.splice(index, 1);
        }
    });
    usuario2.forEach((item, index) => {
        if (item === -1) {
            usuario1.splice(index, 1);
            usuario2.splice(index, 1);
        }
    });

    matriz.push(usuario1);
    matriz.push(usuario2);

    return matriz
}

// matrizDosUsuarios(usuario1, usuario2)
