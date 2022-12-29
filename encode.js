import { encode } from "./oneTimePad.js";

let [_1, _2, message, key] = process.argv;

if (!message) throw new Error("Encrypted message undefined.");
if (!key) throw new Error("Key undefined.");

if (message.length !== key.length) throw new Error("Message and key length not equal.");

console.log(encode(message, key));
