/* eslint-env worker */
const secp256k1 = require('secp256k1');
const keccak = require('keccak');
const randomBytes = require('randombytes');
//const bls = require("./helpers/bls");
const petraBls = require("./pkg/pairing");

const step = 500;

let stripColon = (str) => {
    if(typeof str === "string"){
        let arrayOfStr = str.split(":");
        let newStr = arrayOfStr.join("");
        return newStr;
    }
    return str;
};

const getRandomWallet = () => {


    const sec1 = new petraBls.SecretKey();
    const  secretKey = sec1.setByCSPRNG();


    //const sec = new bls.SecretKey();
    //sec.setByCSPRNG();
    //let secretKey = new Scalar(fixEndian("2cdd5252f045a8d2:ac9398bcbf8d82f9:e515f6d46cc9b221:376c6d32c0ccc10c:"));
	//let expectedPublicKey = new G2("84:74:49:ae:ea:c9:ae:fe:3d:5f:f0:90:fb:1d:d1:59:de:5a:4c:0f:32:91:6d:9f:1d:b6:2e:3c:1f:b2:e6:7b:6f:79:5a:cb:f9:d5:e1:76:f8:ff:83:d1:2c:59:d8:ce:00:42:e3:78:34:bb:bf:ea:f2:9c:de:15:ca:38:6e:c4:e4:e4:70:76:a6:ac:30:b5:93:e7:c3:f1:c4:57:9d:c0:97:43:0e:69:d0:8b:80:92:23:12:00:69:bc:e4:67:e6:");
	//let computedPublicKey = G2.publicFromPrivateKey(secretKey);

    let publicKey  = petraBls.BonehLynnShacham.generatePublicKey(secretKey);
    if (publicKey.s === undefined) {
        publicKey.s = '00';
    }

    return {
        address: keccak('keccak256').update(stripColon(publicKey.s)).digest().slice(-20).toString('hex'),
        privKey: sec1.serializeToHexStr(secretKey.s)
    };


};

/**
 * Check if a wallet respects the input constraints
 * @param address
 * @param input
 * @param isChecksum
 * @param isSuffix
 * @returns {boolean}
 */
const isValidVanityAddress = (address, input, isChecksum, isSuffix) => {
    const subStr = isSuffix ? address.substr(40 - input.length) : address.substr(0, input.length);

    if (!isChecksum) {
        return input === subStr;
    }
    if (input.toLowerCase() !== subStr) {
        return false;
    }

    return isValidChecksum(address, input, isSuffix);
};

const isValidChecksum = (address, input, isSuffix) => {
    const hash = keccak('keccak256').update(address).digest().toString('hex');
    const shift = isSuffix ? 40 - input.length : 0;

    for (let i = 0; i < input.length; i++) {
        const j = i + shift;
        if (input[i] !== (parseInt(hash[j], 16) >= 8 ? address[j].toUpperCase() : address[j])) {
            return false;
        }
    }
    return true;
};

const toChecksumAddress = (address) => {
    const hash = keccak('keccak256').update(address).digest().toString('hex');
    let ret = '';
    for (let i = 0; i < address.length; i++) {
        ret += parseInt(hash[i], 16) >= 8 ? address[i].toUpperCase() : address[i];
    }
    return ret;
};

/**
 * Generate a lot of wallets until one satisfies the input constraints
 * @param input - String chosen by the user
 * @param isChecksum - Is the input case-sensitive
 * @param isSuffix - Is it a suffix, or a prefix
 * @param cb - Callback called after x attempts, or when an address if found
 * @returns
 */

const getVanityWallet = (input, isChecksum, isSuffix, cb) => {
    petraBls.init().then(()=> {
        input = isChecksum ? input : input.toLowerCase();
        let wallet = getRandomWallet();
        let attempts = 1;

        while (!isValidVanityAddress(wallet.address, input, isChecksum, isSuffix)) {
            if (attempts >= step) {
                cb({attempts});
                attempts = 0;
            }
            wallet = getRandomWallet();
            attempts++;
        }
        cb({address: '0x' + toChecksumAddress(wallet.address), privKey: wallet.privKey, attempts});
    });
};


onmessage = function (event) {
    const input = event.data;
    try {

        getVanityWallet(input.hex, input.checksum, input.suffix, (message) => postMessage(message));
       
    } catch (err) {
        self.postMessage({error: err.toString()});
    }
};

module.exports = {
    onmessage
};
