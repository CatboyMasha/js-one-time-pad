import { decode } from "./oneTimePad.js";

let [_1, _2, message, key] = process.argv;

if (message.includes("//")) [message, key] = message.split("//");

if (!message) throw new Error("Encrypted message undefined.");
if (!key) throw new Error("Key undefined.");

if (message.split(" ").length !== key.split(" ").length) throw new Error("Message and key length not equal.");

console.log(decode(message, key));
