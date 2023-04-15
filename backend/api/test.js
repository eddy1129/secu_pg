const NodeRSA = require('node-rsa');

const key = new NodeRSA({b: 512});

key.setOptions({encryptionScheme: 'pkcs1'});

const public_key = key.exportKey('public');
const private_key = key.exportKey('private');

console.log(public_key + "\n" + private_key);