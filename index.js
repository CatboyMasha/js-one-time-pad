import { decode, encode } from "./oneTimePad.js";
import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });

const method = input("Encode or Decode (e/d)", (value) => ["e", "d"].includes(value.toLowerCase()));

let message, key;

switch (method.toLowerCase()) {
  case "e":
    message = input("Message", () => true);
    key = input("Key (leave empty to generate)", (value) => message.length === value.length || !value);

    console.log(encode(message, key));
    break;
  case "d":
    const rawInput = input("Message or combined", () => true);
    if (rawInput.includes(" // ")) {
      [message, key] = rawInput.trim().split(" // ");
    } else {
      message = rawInput;
      const splitMessage = message.split(" ");
      key = input("Key", (value) => splitMessage.length === value.split(" ").length);
    }

    const { decryptedMessage, originalKey } = decode(message, key);
    console.log(decode(message, key));
}

function input(message, validator) {
  let inputValue = "";

  let isInvalid = false;

  do {
    inputValue = prompt(`${message} ${isInvalid ? "(Invalid) " : ""}> `);

    isInvalid = !validator(inputValue);
  } while (isInvalid);

  return inputValue;
}
