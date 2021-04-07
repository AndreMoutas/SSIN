module.exports = {
    calculateSquareRoot(number) {
        return Math.sqrt(number);
    },
    calculateCubitRoot(number) {
        return Math.cbrt(number);
    },
    calculateNRoot(number, root) {
        return Math.pow(number, 1/root);
    },
}