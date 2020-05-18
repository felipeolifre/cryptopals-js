const assert = require("assert").strict;

const { xorCipher } = require("../../utils/ciphers");

const plaintext = `Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`;
const key = "ICE";
const expectedCiphertext =
    "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f";

const plaintextBuffer = Buffer.from(plaintext, "utf8");
const computedCiphertext = xorCipher(plaintextBuffer, key).toString("hex");
assert.strictEqual(
    computedCiphertext,
    expectedCiphertext,
    "The computed ciphertext doesn't match the expected one."
);
