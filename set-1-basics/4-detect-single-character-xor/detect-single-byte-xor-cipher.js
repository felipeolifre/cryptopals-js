const fs = require("fs");

const {
    breakXORCipher,
} = require("../../utils/cryptanalysis/english-frequency");

const file = fs.readFileSync(
    "set-1-basics/4-detect-single-character-xor/file.txt",
    "utf8"
);
const result = file.split("\n").reduce(
    (previousFind, ciphertext) => {
        const [
            candidateKey,
            candidatePlaintext,
            candidatePlaintextScore,
        ] = breakXORCipher(ciphertext);

        const [, , , previousScore] = previousFind;
        if (candidatePlaintextScore < previousScore) {
            return previousFind;
        }

        return [
            ciphertext,
            candidateKey,
            candidatePlaintext,
            candidatePlaintextScore,
        ];
    },
    [null, null, null, 0]
);
[ciphertext, key, plaintext] = result;
console.log(`Ciphertext\t${ciphertext}`);
console.log(`Key\t\t\t\t'${String.fromCharCode(key)}' (${key})`);
console.log(`Plaintext\t${plaintext}`);
