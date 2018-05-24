let seed = 1;

function random(): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomInt(min: number, max: number): number {
    return Math.round(random() * (max - min)) + min;
}
/**
 * @template T
 * @param {Array<T>} array
 * @returns {T}
 */
function randomItem<T>(array: Array<T>): T {
    const idx = randomInt(0, array.length - 1);
    const result = array[idx];
    return result;
}

const appUtils = {
    random: random,
    randomInt: randomInt,
    randomItem: randomItem
};

export { appUtils };
