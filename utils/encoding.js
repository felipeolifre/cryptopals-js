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
    isHex,
    isHexString,
};
