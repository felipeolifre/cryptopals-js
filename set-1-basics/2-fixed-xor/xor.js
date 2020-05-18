const readline = require("readline");

const { isHexString } = require("../../utils/encoding");
const { xor } = require("../../utils/buffers");

function hexXor(hexString1, hexString2) {
    const buffer1 = Buffer.from(hexString1, "hex");
    const buffer2 = Buffer.from(hexString2, "hex");
    return xor(buffer1, buffer2).toString("hex");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("What's the first hex string?\n", (hexString1) => {
    if (!isHexString(hexString1)) {
        console.error("Please enter a hex encoded string");
        process.exit(1);
    }

    rl.question("What's the second hex string?\n", (hexString2) => {
        if (!isHexString(hexString2)) {
            console.error("Please enter a hex encoded string");
            process.exit(1);
        }

        console.log("The XOR operation produced:");
        console.log(hexXor(hexString1, hexString2));

        rl.close();
    });
});
