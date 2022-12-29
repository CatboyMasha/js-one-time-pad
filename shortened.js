export function encode(message, key) {
  const charCodes = message.split("").map((character) => character.charCodeAt(0));
  const keyArray = key
    ? key.split("").map((character) => character.charCodeAt(0))
    : new Array(charCodes.length).fill(undefined).map(() => Math.floor(Math.random() * 128) + 1);
  const encryptedMessage = charCodes
    .map((charCode, index) => charCode + keyArray[index])
    .map((charCode) => charCode.toString(16))
    .join(" ");
  const hexKey = keyArray.map((keyCode) => keyCode.toString(16)).join(" ");
  return { message: encryptedMessage, key: hexKey, combined: `${encryptedMessage} // ${hexKey}` };
}

export function decode(message, key) {
  const keyArray = key.split(" ").map((keyCode) => parseInt(keyCode, 16));
  return {
    decryptedMessage: message
      .split(" ")
      .map((charCode) => parseInt(charCode, 16))
      .map((charCode, index) => charCode - keyArray[index])
      .map((charCode) => String.fromCharCode(charCode))
      .join(""),
    originalKey: keyArray.map((keyCode) => String.fromCharCode(keyCode)).join(""),
  };
}
