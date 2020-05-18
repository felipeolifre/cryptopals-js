const { charRange } = require("../ranges");
const { xorCipher } = require("../ciphers");

const candidateKeys = [...charRange("!", "~")];

// From http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
const englishLetterFrequency = {
    a: 0.0812,
    b: 0.0149,
    c: 0.0271,
    d: 0.0432,
    e: 0.1202,
    f: 0.023,
    g: 0.0203,
    h: 0.0592,
    i: 0.0731,
    j: 0.001,
    k: 0.0069,
    l: 0.0398,
    m: 0.0261,
    n: 0.0695,
    o: 0.0768,
    p: 0.0182,
    q: 0.0011,
    r: 0.0602,
    s: 0.0628,
    t: 0.091,
    u: 0.0288,
    v: 0.0111,
    w: 0.0209,
    x: 0.0017,
    y: 0.0211,
    z: 0.0007,
};

const validASCII = [
    10, // \n (new line)
    13, // \r (carriage return)
    32, // White-space
    33, // !
    34, // "
    39, // '
    40, // (
    41, // )
    44, // ,
    45, // -
    46, // .
    ...charRange("0", "9"),
    58, // :
    59, // ;
    63, // ?
    ...charRange("A", "Z"),
    91, // [
    93, // ]
    ...charRange("a", "z"),
];

/**
 * Calculates the letter frequencies for all the letters in a given word.
 *
 * @param {string} word - A word.
 *
 * @returns {object} A dictionary mapping the word letters to their frequencies.
 */
function getLetterFrequency(word) {
    const letters = word.split("");
    const countByLetter = letters.reduce((countByLetter, letter) => {
        if (countByLetter[letter]) {
            countByLetter[letter] += 1;
        } else {
            countByLetter[letter] = 1;
        }
        return countByLetter;
    }, {});
    return Object.keys(countByLetter).reduce((frequencyByLetter, letter) => {
        const count = countByLetter[letter];
        const frequency = count / letters.length;
        frequencyByLetter[letter] = frequency;
        return frequencyByLetter;
    }, {});
}

/**
 * Calculates the score for a word in the English language.
 *
 * Calculates the score of a given word by comparing its letter frequencies with those of the
 * English language.
 *
 * @param {string} word - A word.
 *
 * @returns {number} The score for the given word.
 */
function scoreEnglishWord(word) {
    const frequencyByLetter = getLetterFrequency(word);
    return Object.keys(frequencyByLetter).reduce((score, letter) => {
        const expectedFrequency = englishLetterFrequency[letter];
        const measuredFrequency = frequencyByLetter[letter];
        return score + 1 - Math.abs(expectedFrequency - measuredFrequency);
    }, 0);
}

/**
 * Calculates the score for a piece of supposedly English text.
 *
 * Calculates the score of a given piece of text by comparing its letter frequencies with those of
 * the English language.
 *
 * @param {string} text - A piece of text.
 *
 * @returns {number} The score for the given piece of text.
 */
function scoreEnglishText(text) {
    const words = text
        .toLowerCase()
        .replace(/[^a-z ]/g, "")
        .split(" ");
    return words.reduce((score, word) => {
        return score + scoreEnglishWord(word);
    }, 0);
}

/**
 * Checks if a given string is a valid (printable) character.
 *
 * @param {string} char - The string to evaluate.
 *
 * @returns {boolean} Whether or not the given string is a valid (printable) character.
 */
function isValidChar(char) {
    const charCode = char.charCodeAt(0);
    return validASCII.includes(charCode);
}

/**
 * Checks if all the characters in a candidate plaintext are valid (printable).
 *
 * @param {string} candidatePlaintext - A candidate plaintext string.
 *
 * @returns {boolean} Whether or not all the characters in the given string are valid (printable).
 */
function isValidCandidatePlaintext(candidatePlaintext) {
    return candidatePlaintext.split("").every(isValidChar);
}

/**
 * Breaks a single-byte XOR cipher using frequency analysis.
 *
 * @param {string} ciphertext - The ciphertext to decrypt, in hex encoding.
 *
 * @returns {object} An array with the found key and the decrypted message. [null, null] is
 * returned if a candidate key isn't found and hence the message is not decrypted.
 */
function breakXORCipher(ciphertext) {
    const ciphertextBuffer = Buffer.from(ciphertext, "hex");
    return candidateKeys.reduce(
        (previousFind, candidateKey) => {
            const candidatePlaintextBuffer = xorCipher(
                ciphertextBuffer,
                candidateKey
            );
            const candidatePlaintext = candidatePlaintextBuffer.toString(
                "utf8"
            );
            if (!isValidCandidatePlaintext(candidatePlaintext)) {
                return previousFind;
            }

            const [, , previousScore] = previousFind;
            const candidatePlaintextScore = scoreEnglishText(
                candidatePlaintext
            );
            if (candidatePlaintextScore < previousScore) {
                return previousFind;
            }

            return [candidateKey, candidatePlaintext, candidatePlaintextScore];
        },
        [null, null, 0]
    );
}

module.exports = {
    breakXORCipher,
};
