// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require("uuid");
const id = "6a0ad326e3754b0c83a89a816001a3b9";

console.log(uuidv4().replaceAll("-", "").concat("account"));
console.log(id.length);