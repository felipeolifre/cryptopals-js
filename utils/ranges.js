/**
 * Gets the range between two numbers.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 *
 * @return {number[]} An array with all the numbers in the range.
 */
function range(start, end) {
    return [...Array(end - start + 1).keys()].map((i) => i + start);
}

/**
 * Gets the range between two characters, represented by their numerical UTF-16 codes.
 *
 * @param {string} startChar - The starting character of the range.
 * @param {string} endChar - The ending character of the range.
 *
 * @return {number[]} An array with the numerical UTF-16 code for all the characters in the range.
 */
function charRange(startChar, endChar) {
    return range(startChar.charCodeAt(0), endChar.charCodeAt(0));
}

module.exports = {
    charRange,
    range,
};
