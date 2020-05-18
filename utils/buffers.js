/**
 * Performs an XOR operation between two buffers.
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

module.exports = {
    xor,
};
