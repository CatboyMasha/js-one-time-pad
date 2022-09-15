const prompt = require('prompt-sync')();
const alpha = ` abcdefghijklmnopqrstuvwxyz0123456789,;.:-_'*?+!@£#¤$%&/{([)]=}<>""''`;
const scripts = {
    dec: function () {
        var msg = prompt("message to decrypt > ").split(" ");
        var key = prompt("key > ").split(" ");
        var msg_num = [];
        for (let i = 0; i < msg.length; i++) {
            msg_num = [...msg_num, parseInt(msg[i], 16)];   
        }
        var key_num = [];
        for (let i = 0; i < key.length; i++) {
            key_num = [...key_num, parseInt(key[i], 16)];   
        }
        var decrypted_message = [];
        for (let i = 0; i < msg.length; i++) {
            decrypted_message = [...decrypted_message,
                msg_num[i] - key_num[i]];
        }
        var decrypted_message_string = [];
        for (let i = 0; i < decrypted_message.length; i++) {
            decrypted_message_string = [...decrypted_message_string,
            alpha[decrypted_message[i]]];
        }
        decrypted_message_string = decrypted_message_string
            .toString().replace(/,/g, " ").replace(/(.{1})./g,"$1");
        return decrypted_message_string;
    },
    enc: function () {
        var msg = prompt('message to encrypt > ');
        var msg_num = [];
        for (let i = 0; i < msg.length; i++) {
            msg_num = [...msg_num, alpha.indexOf(msg[i])];
        }
        var otp = [];
        for (let i = 0; i < msg.length; i++) {
            otp = [...otp, parseInt(Math.floor(Math.random() * 128) + 1, 10)];
        }
        var encrypted_message_num = [];
        for (let i = 0; i < msg_num.length; i++) {
            encrypted_message_num = [...encrypted_message_num,
                parseInt(msg_num[i], 10) + parseInt(otp[i], 10)]
        }
        var encrypted_message_hex = [];
        for (let i = 0; i < encrypted_message_num.length; i++) {
            encrypted_message_hex = [...encrypted_message_hex, 
                parseInt(encrypted_message_num[i], 10).toString(16)];
        }
        var otp_hex = [];
        for (let i = 0; i < otp.length; i++) {
            otp_hex = [...otp_hex, parseInt(otp[i], 10).toString(16)];
        }
        var otp_string = otp_hex.toString().replace(/,/g, " ");
        var encrypted_message_string = encrypted_message_hex
            .toString().replace(/,/g, " ");
        return "msg = "+encrypted_message_string+"\nkey = "+otp_string;

    }
}
switch (prompt("encrypt or decrypt? (e/d) > ")) {
    case "e":
        console.log(scripts.enc());
        break;
    case "d":
        console.log(scripts.dec());
        break;
}


