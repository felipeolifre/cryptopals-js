const readline = require("readline");

const { isHexString } = require("../../utils/encoding");

function hexToBase64(hexString) {
    const buffer = Buffer.from(hexString, "hex");
    return buffer.toString("base64");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question("What's your hex string?\n", (hexString) => {
    if (!isHexString(hexString)) {
        console.error("Please enter a hex encoded string");
        process.exit(1);
    }

    console.log("It equals to the base64 string:");
    console.log(hexToBase64(hexString));

    rl.close();
});
