const { xor } = require("./buffers");

function xorCipher(input, key) {
    const inputBuffer = Buffer.from(input, "hex");
    const keyBuffer = Buffer.allocUnsafe(inputBuffer.length).fill(key);
    const outputBuffer = xor(inputBuffer, keyBuffer);
    return outputBuffer.toString("utf8");
}

module.exports = {
    xorCipher,
};
