/**
 * Calcular la media de un vector
 */
export default function average(vector) {
    const average = vector.reduce((a, b) => a + b, 0) / vector.length;
    return average
}
