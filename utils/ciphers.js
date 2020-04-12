const { xor } = require("./buffers");

/**
 * XOR encrypt/decrypt a buffer using the given key.
 *
 * @param {Buffer} inputBuffer - The bytes to encrypt or decrypt.
 * @param {string} key - The key.
 *
 * @returns {Buffer} The encrypted/decrypted buffer.
 */
function xorCipher(inputBuffer, key) {
    const keyBuffer = Buffer.allocUnsafe(inputBuffer.length).fill(key);
    return xor(inputBuffer, keyBuffer);
}

module.exports = {
    xorCipher,
};
