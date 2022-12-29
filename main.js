//! I was so free to also refactor your original code to proper coding standards and making it more readable

//* Please never use var for variables, always use const unless you have to modify the variable later, then use let
//* I didn't show this because I always just used map but instead of doing the following

let array = [];

for (let i = 0; i < 10; i++) {
  array = [...array, i];
}

//* You could convert it to variations that would look much, much better

//* There is a push method, appending the value to the end of the array
for (let i = 0; i < 10; i++) {
  array.push(i);
}

//* You don't need brackets for for and while loops aswell as if/else statements if you don't need more than one line
for (let i = 0; i < 10; i++) array.push(i);

//* This is probably the most readable approach as it shows that you create an array of length 10 and map over it to get the index and put it as the value
array = new Array(10).fill(0).map((_, i) => i);

//* Try to use imports instead of require in node.js
// const prompt = require('prompt-sync')();
import PromptSync from "prompt-sync";

const prompt = PromptSync();

//* Instead of predefining a list of characters you should just use charcodes
// const alpha = ` abcdefghijklmnopqrstuvwxyz0123456789,;.:-_'*?+!@£#¤$%&/{([)]=}<>""''`;

//* It is advised to not use anonymous function and pass them to a variable
//* Instead, use the function keyword for named functions
// encode = () => {
function encode() {
  const msg = prompt("message to encrypt > ");

  //* I'd advise you to look up how to work with arraylists
  //* Also look up what forEach and map functions are, they are very helpful

  //* Try naming things to the proper standard of that language you're working with
  //* In javascript that would be camelCase for variables, pascalCase for classes and snakeCase for statics
  // var msg_num = [];
  // for (let i = 0; i < msg.length; i++) {
  //   msg_num = [...msg_num, alpha.indexOf(msg[i])];
  // }
  //* I've used charCodeAt() to get the charCode of that specific character
  const msgNum = msg.split("").map((character) => character.charCodeAt(0));

  const inpkey = prompt("key (leave empty to generate) > ");

  //* Instead of looking if the length of the string is greater than 0 just check if the string is truethy
  let otp;
  // if (inpkey.length > 0) {
  //* I've noticed that in this scenario you want a space seperated hex key from the user
  //* but you convert it to an array of ints and later back to hex.
  //? Maybe you wanted to take in a string?
  //   var otp = [];
  //   for (let i = 0; i < inpkey.split(" ").length; i++) {
  //     otp = [...otp, parseInt(inpkey.split(" ")[i], 16)];
  //   }
  // } else {
  //   var otp = [];
  //   for (let i = 0; i < msg.length; i++) {
  //* You don't have to parse here as there aren't any floats nor integers in javascript/typescript
  //* There's only the number which is both int and float
  //     otp = [...otp, parseInt(Math.floor(Math.random() * 128) + 1, 10)];
  //   }
  // }
  if (inpkey) otp = inpkey.split("").map((character) => character.charCodeAt(0));
  else otp = msg.split("").map(() => Math.floor(Math.random() * 128) + 1);

  // var encrypted_message_num = [];
  // for (let i = 0; i < msg_num.length; i++) {
  //? Seriously, why did you exactly parse a number of which you can be sure is not a float?
  //* On line 25 you're getting the index of a character in alpha and indexOf ALWAYS returns an "integer"
  //   encrypted_message_num = [...encrypted_message_num, parseInt(msg_num[i], 10) + parseInt(otp[i], 10)];
  // }
  const encryptedMessageNum = msgNum.map((charCode, index) => charCode + otp[index]);

  // var otp_hex = [];
  // for (let i = 0; i < otp.length; i++) {
  //* Again, no need to parse here either
  //   otp_hex = [...otp_hex, parseInt(otp[i], 10).toString(16)];
  // }
  const otpHex = otp.map((charCode) => charCode.toString(16));

  // var encrypted_message_hex = [];
  // for (let i = 0; i < encrypted_message_num.length; i++) {
  //   encrypted_message_hex = [...encrypted_message_hex, parseInt(encrypted_message_num[i], 10).toString(16)];
  // }
  const encryptedMessageHex = encryptedMessageNum.map((charCode) => charCode.toString(16));

  //* You know, there's a really cool method on strings called join()
  // var otp_string = otp_hex.toString().replace(/,/g, " ");
  const otpString = otpHex.join(" ");
  //* Same here
  // var encrypted_message_string = encrypted_message_hex.toString().replace(/,/g, " ");
  const encryptedMessageString = encryptedMessageHex.join(" ");
  //* I'd strongly advise against this as it's horrible for readability
  //* Use backticks (``) for string formatting
  // return (
  //   "message = " +
  //   encrypted_message_string +
  //   "\nkey = " +
  //   otp_string +
  //   "\ncombi = " +
  //   encrypted_message_string +
  //   " // " +
  //   otp_string
  // );
  return `message = ${encryptedMessageString}
Key = ${otpString}
Combi = ${encryptedMessageString} // ${otpString}`;
}

// decode = () => {
function decode() {
  const rawInp = prompt("message > ");
  let msg, key;
  if (rawInp.includes("//"))
    //* Instead of splitting it twice, store the result in a variable, or better yet, do destructuring
    // var msg = rawinp.split(" // ")[0].split(" ");
    // var key = rawinp.split(" // ")[1].split(" ");
    [msg, key] = rawInp.split(" // ").map((inputPart) => inputPart.split(" "));
  else {
    msg = rawInp.split(" ");
    key = prompt("key > ").split(" ");
  }
  // var msg_num = [];
  // for (let i = 0; i < msg.length; i++) {
  //   msg_num = [...msg_num, parseInt(msg[i], 16)];
  // }
  const msgNum = msg.map((hexCode) => parseInt(hexCode, 16));

  // var key_num = [];
  // for (let i = 0; i < key.length; i++) {
  //   key_num = [...key_num, parseInt(key[i], 16)];
  // }
  const keyNum = key.map((hexCode) => parseInt(hexCode, 16));

  // var decrypted_message = [];
  // for (let i = 0; i < msg.length; i++) {
  //   decrypted_message = [...decrypted_message, msg_num[i] - key_num[i]];
  // }
  const decryptedMessage = msgNum.map((charCode, index) => charCode - keyNum[index]);

  // var decrypted_message_string = [];
  // for (let i = 0; i < decrypted_message.length; i++) {
  //   decrypted_message_string = [...decrypted_message_string, alpha[decrypted_message[i]]];
  // }
  const decryptedMessageString = decryptedMessage.map((charCode) => String.fromCharCode(charCode));

  //* Not gonna lie I was really in shock about this... just use the join method qwq
  // decrypted_message_string = decrypted_message_string
  //   .toString()
  //   .replace(/,/g, " ")
  //* You wouldn't even have to use this second replace if you just replaced every comma with "" instead of " " in the before replace
  //   .replace(/(.{1})./g, "$1");
  return decryptedMessageString.join("");
}

//* I know that this probably was a smol side project written in under an hour or something but handling edge cases is always important
switch (prompt("Encrypt or Decrypt (e/d) > ")) {
  case "e":
    console.log(encode());
    break;
  case "d":
    console.log(decode());
    //* It may seem like this break was not needed, which in this case it really wasn't but you shouldn't just leave it away, it removes some of the readability of the code
    break;
  //? What if the user chooses to take something besides "e" or "d"?
  default:
    throw new Error("Invalid option");
}

//* And yes, this code still works!

//* Thanks for reading through this, I hope you learned at least one or two things!
//* By the way, this shouldn't come over as douchy or something similiar, I just wanted to help and show what clean code is

//! Wish you a great day!
