const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function xor(a, b) {
    const length = Math.max(a.length, b.length);
    const buffer = Buffer.allocUnsafe(length);

    for (let i = 0; i < length; i += 1) {
        buffer[i] = a[i] ^ b[i];
    }

    return buffer;
}

function hexXor(hexString1, hexString2) {
    const buffer1 = Buffer.from(hexString1, "hex");
    const buffer2 = Buffer.from(hexString2, "hex");
    return xor(buffer1, buffer2).toString("hex");
}

rl.question("What's the first hex string?\n", (hexString1) => {
    rl.question("What's the second hex string?\n", (hexString2) => {
        console.log("The XOR operation produced:");
        console.log(hexXor(hexString1, hexString2));
        rl.close();
    });
});
