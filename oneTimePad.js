export function encode(message, key) {
  const charCodes = message.split("").map((character) => character.charCodeAt(0));

  const keyArray = key ? key.split("").map((character) => character.charCodeAt(0)) : generateKeyArray(charCodes.length);

  const encryptedCharCodes = charCodes.map((charCode, index) => charCode + keyArray[index]);

  const hexKeyArray = keyArray.map((keyCode) => keyCode.toString(16));

  const encryptedHexCharCodes = encryptedCharCodes.map((charCode) => charCode.toString(16));

  const encryptedMessage = encryptedHexCharCodes.join(" ");
  const hexKey = hexKeyArray.join(" ");

  return { message: encryptedMessage, key: hexKey, combined: `${encryptedMessage} // ${hexKey}` };
}

export function decode(message, key) {
  const charCodes = message.split(" ").map((charCode) => parseInt(charCode, 16));

  const keyArray = key.split(" ").map((keyCode) => parseInt(keyCode, 16));

  const decryptedCharCodes = charCodes.map((charCode, index) => charCode - keyArray[index]);

  const decryptedMessage = decryptedCharCodes.map((charCode) => String.fromCharCode(charCode)).join("");

  const originalKey = keyArray.map((keyCode) => String.fromCharCode(keyCode)).join("");

  return { decryptedMessage, originalKey };
}

function generateKeyArray(length) {
  return new Array(length).fill(undefined).map(() => Math.floor(Math.random() * 128) + 1);
}
