const readline = require("readline");

const { isHexString } = require("../../utils/encoding");
const {
    breakXORCipher,
} = require("../../utils/cryptanalysis/english-frequency");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("What's the hex encoded string?\n", (ciphertext) => {
    if (!isHexString(ciphertext)) {
        console.error("Please enter a hex encoded string");
        process.exit(1);
    }

    const [key, plaintext] = breakXORCipher(ciphertext);
    console.log(`Key:\t\t\t\t'${String.fromCharCode(key)}' (${key})`);
    console.log(`Message:\t${plaintext}`);

    rl.close();
});
