/**
 * Performs an XOR operation.
 *
 * @param {Buffer} a - The first binary operand.
 * @param {Buffer} b - The second binary operand.
 *
 * @returns {Buffer} The resulting binary from the XOR operation.
 */
function xor(a, b) {
    const length = Math.max(a.length, b.length);
    const buffer = Buffer.allocUnsafe(length);

    for (let i = 0; i < length; i += 1) {
        buffer[i] = a[i] ^ b[i];
    }

    return buffer;
}

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

/**
 * Checks if a value is a hex.
 *
 * @param {(string|number)} value - The string or number to evaluate.
 *
 * @returns {boolean} Whether or not the value is a hex.
 */
function isHex(value) {
    const hexRegExp = /^[0-9a-f]*$/;
    return hexRegExp.test(value);
}

/**
 * Checks if a string is a hex encoded string.
 *
 * @param {string} string - The string to evaluate.
 *
 * @returns {boolean} Whether or not the string is a hex encoded string.
 */
function isHexString(string) {
    if (string.length % 2 !== 0) {
        return false;
    }

    return isHex(string);
}

module.exports = {
    charRange,
    isHex,
    isHexString,
    range,
    xor,
};
