const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function hexToBase64(hexString) {
    const buf = Buffer.from(hexString, "hex");
    return buf.toString("base64");
}

rl.question("What's your hex string?\n", hexString => {
    console.log("It equals to the base64 string:");
    console.log(hexToBase64(hexString));
    rl.close();
});
