((generator) => {
    if (typeof exports === 'object') {
        const crypto = require('crypto')
        crypto.getRandomValues = crypto.randomFillSync
        generator(exports, crypto, true)
    } else {
        const crypto = window.crypto || window.msCrypto
        const exports = {}
        //console.log("Good")
        window.bls = generator(exports, crypto, false)
    }
})((exports, crypto, isNodeJs) => {

        const BLS_SECRETKEY_SIZE = 32;
        let wasm;

        let WASM_VECTOR_LEN = 0;

        let cachedTextEncoder = new TextEncoder('utf-8');

            let cachegetUint8Memory = null;

        let rev = v => { 
            var z = ""; 
            while (v.length > 0) { 
                z = v.substr(0, 2) + z; v = v.substr(2); 
            } return z;
        }
        
        let fixEndian = w => { 
            return w.split(":").map(rev).join(":"); 
        } // From turquoise to indigo and the other way round
        
        
        let toHex = (a, start, n) => {
            let s = ''
            for (let i = 0; i < n; i++) {
                s += ('0' + a[start + i].toString(16)).slice(-2)
            }
            return s
        }
        
        let fromHexStr = s => {
            if (s.length & 1) throw new Error('fromHexStr:length must be even ' + s.length)
            const n = s.length / 2
            const a = new Uint8Array(n)
            for (let i = 0; i < n; i++) {
            a[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16)
            }
            return a
        }
        
        let partition = (str, interval) => {
            let len = str.length;
            let divisions = Math.ceil(len / interval);
            let s = "";
            for(let i = 0 ; i < divisions; i++) {
                s += str.substr(i*interval, interval) + ":";
            }
            if(s.endsWith(":")){
                return s.substr(0, s.length-1)
            }
            return s;
        };
        
        let stripColon = (str) => {
            if(typeof str === "string"){
                let arrayOfStr = str.split(":");
                let newStr = arrayOfStr.join("");
                return newStr;
            }
            return str;
        };

        let normalize = s => (s ? s.toLowerCase() : s);

    function setup(exports) {
        const mod = exports.mod

        function getUint8Memory() {
            if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== mod.wasm.memory.buffer) {
                cachegetUint8Memory = new Uint8Array(mod.wasm.memory.buffer);
            }
            return cachegetUint8Memory;
        }

        let passStringToWasm;
        if (typeof cachedTextEncoder.encodeInto === 'function') {
            passStringToWasm = function(arg) {


                let size = arg.length;
                let ptr = mod.wasm.__wbindgen_malloc(size);
                let offset = 0;
                {
                    const mem = getUint8Memory();
                    for (; offset < arg.length; offset++) {
                        const code = arg.charCodeAt(offset);
                        if (code > 0x7F) break;
                        mem[ptr + offset] = code;
                    }
                }

                if (offset !== arg.length) {
                    arg = arg.slice(offset);
                    ptr = mod.wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
                    const view = getUint8Memory().subarray(ptr + offset, ptr + size);
                    const ret = cachedTextEncoder.encodeInto(arg, view);

                    offset += ret.written;
                }
                WASM_VECTOR_LEN = offset;
                return ptr;
            };
        } else {
            passStringToWasm = function(arg) {


                let size = arg.length;
                let ptr = mod.wasm.__wbindgen_malloc(size);
                let offset = 0;
                {
                    const mem = getUint8Memory();
                    for (; offset < arg.length; offset++) {
                        const code = arg.charCodeAt(offset);
                        if (code > 0x7F) break;
                        mem[ptr + offset] = code;
                    }
                }

                if (offset !== arg.length) {
                    const buf = cachedTextEncoder.encode(arg.slice(offset));
                    ptr = mod.wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
                    getUint8Memory().set(buf, ptr + offset);
                    offset += buf.length;
                }
                WASM_VECTOR_LEN = offset;
                return ptr;
            };
        }

        let cachegetInt32Memory = null;
        function getInt32Memory() {
            if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== mod.wasm.memory.buffer) {
                cachegetInt32Memory = new Int32Array(mod.wasm.memory.buffer);
            }
            return cachegetInt32Memory;
        }

        let cachedTextDecoder = new TextDecoder('utf-8');

        function getStringFromWasm(ptr, len) {
            return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
        }
        /**
        * @param {string} a
        * @param {string} b
        * @returns {string}
        */
        exports.g1_add_s = (a, b) => {
            const retptr = 8;
            const ret = mod.wasm.g1_add_s(retptr, passStringToWasm(a), WASM_VECTOR_LEN, passStringToWasm(b), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} a
        * @param {string} b
        * @returns {string}
        */
        let g2_add_s = (a, b) => {
            const retptr = 8;
            const ret = mod.wasm.g2_add_s(retptr, passStringToWasm(a), WASM_VECTOR_LEN, passStringToWasm(b), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        exports.g1_get_one_s = () => {
            const retptr = 8;
            const ret = mod.wasm.g1_get_one_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        let g2_get_one_s = () => {
            const retptr = 8;
            const ret = mod.wasm.g2_get_one_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        exports.gt_get_one_s = () => {
            const retptr = 8;
            const ret = mod.wasm.gt_get_one_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        exports.g1_get_zero_s =() => {
            const retptr = 8;
            const ret = mod.wasm.g1_get_zero_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        let g2_get_zero_s = () => {
            const retptr = 8;
            const ret = mod.wasm.g2_get_zero_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @returns {string}
        */
        exports.gt_get_zero_s = () => {
            const retptr = 8;
            const ret = mod.wasm.gt_get_zero_s(retptr);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g
        * @param {string} p
        * @returns {string}
        */
        exports.g1_mul_s = (g, p) => {
            const retptr = 8;
            const ret = mod.wasm.g1_mul_s(retptr, passStringToWasm(g), WASM_VECTOR_LEN, passStringToWasm(p), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g
        * @param {string} p
        * @returns {string}
        */
        let g2_mul_s = (g, p) => {
            const retptr = 8;
            const ret = mod.wasm.g2_mul_s(retptr, passStringToWasm(g), WASM_VECTOR_LEN, passStringToWasm(p), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g
        * @returns {string}
        */
        exports.g1_neg_s = (g) => {
            const retptr = 8;
            const ret = mod.wasm.g1_neg_s(retptr, passStringToWasm(g), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g
        * @returns {string}
        */
        exports.g2_neg_s = (g) => {
            const retptr = 8;
            const ret = mod.wasm.g2_neg_s(retptr, passStringToWasm(g), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} a
        * @param {string} b
        * @returns {string}
        */
        exports.gt_mul_s = (a, b) => {
            const retptr = 8;
            const ret = mod.wasm.gt_mul_s(retptr, passStringToWasm(a), WASM_VECTOR_LEN, passStringToWasm(b), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g
        * @returns {string}
        */
        exports.gt_inverse_s = (g) => {
            const retptr = 8;
            const ret = mod.wasm.gt_inverse_s(retptr, passStringToWasm(g), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} g1_
        * @param {string} g2_
        * @returns {string}
        */
        exports.pairing_s = (g1_, g2_) => {
            const retptr = 8;
            const ret = mod.wasm.pairing_s(retptr, passStringToWasm(g1_), WASM_VECTOR_LEN, passStringToWasm(g2_), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} data
        * @returns {string}
        */
        exports.hash_to_g1_s = (data) => {
            const retptr = 8;
            const ret = mod.wasm.hash_to_g1_s(retptr, passStringToWasm(data), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

        /**
        * @param {string} data
        * @returns {string}
        */
        exports.hash_to_g2_s = (data) => {
            const retptr = 8;
            const ret = mod.wasm.hash_to_g2_s(retptr, passStringToWasm(data), WASM_VECTOR_LEN);
            const memi32 = getInt32Memory();
            const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
            mod.wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
            return v0;
        }

    
        class Scalar { 
            constructor(s) { this.s = normalize(s); } 
        }

        const bls12381Modulus = new Scalar(fixEndian("73EDA753299D7D48:3339D80809A1D805:53BDA402FFFE5BFE:FFFFFFFF00000001:"));  

        exports.G1 = class extends Scalar{ 
            constructor(s) { super(s); }
            static getOne() { return new G1(g1_get_one_s()); }
            static getZero() { return new G1(g1_get_zero_s()); }
            static mapToElement(data) { return new G1(hash_to_g1_s(data)); }
            static publicFromPrivateKey(privateKeyScalar) { return fixEndian(privateKeyScalar.s) < fixEndian(bls12381Modulus.s) ? G1.getOne().mul(privateKeyScalar) : new G1(); }

            mul(scalar) { return new G1(g1_mul_s(this.s, scalar.s)); }
            add(g1) { return new G1(g1_add_s(this.s, g1.s)); }
            neg() { return new G1(g1_neg_s(this.s)); } 
        }

        let G2 = class extends Scalar { 
            constructor(s) { 
                super(s); 
                this.s = normalize(s);
            }
            mul(scalar) { return new G2(g2_mul_s(this.s, scalar.s)); }

            static getOne() { return new G2(g2_get_one_s()); }
            static getZero() { return new G2(g2_get_zero_s()); }
            static mapToElement(data) { return new G2(hash_to_g2_s(data)); }
            static publicFromPrivateKey(privateKeyScalar) { 
        //	console.log(`privateKeyScalar.s < bls12381Modulus.s = ${privateKeyScalar.s < bls12381Modulus.s}\nprivateKeyScalar.s = ${privateKeyScalar.s}\n < bls12381Modulus.s = ${bls12381Modulus.s}`);
        return fixEndian(privateKeyScalar.s) < fixEndian(bls12381Modulus.s) ? G2.getOne().mul(privateKeyScalar) : new G2(); }

            static serializeToHexStr(pubKey) { return toHex(pubKey, 0, pubKey.length);}
            add(g2) { return new G2(g2_add_s(this.s, g2.s)); }
            neg() { return new G2(g2_neg_s(this.s)); } 
        }

        exports.G1G2 = class { 
            constructor(g1, g2) { 
                this.g1 = g1; this.g2 = g2; 
            }
        }

        exports.GT = class extends Scalar { 
            constructor(s) { 
                super(s)
            }
            static getOne() { return new GT(gt_get_one_s()); }
            static getZero() { return new GT(gt_get_zero_s()); }
            static fromPairing(g1, g2) { return new GT(pairing_s(g1.s, g2.s)); }
            static fromMultiPairing(g1g2s) { return g1g2s.reduce((a, c) => a.mul(GT.fromPairing(c.g1, c.g2)), GT.getOne()); }

            mul(gt) { return new GT(get_mul_s(this.s, gt.s)); }
            inv() { return new GT(gt_inverse_s(this.s)); }
        }

        exports.BonehLynnShacham = class {
            static generatePublicKey(secretScalar) { return G2.publicFromPrivateKey(secretScalar); }
            static sign(elementG1, secretScalar) { return elementG1.mul(secretScalar); }
            static verify(publicKeyG2, hashedMessageG1, signedHashedMessageG1) { return GT.fromPairing(signedHashedMessageG1, G2.getOne()) == GT.fromPairing(hashedMessageG1, publicKeyG2); }
        }

        exports.SecretKey = class {
            setByCSPRNG () {
                const INTERVAL = 16;
                const arrayOfBytes = new Uint8Array(BLS_SECRETKEY_SIZE)
                crypto.getRandomValues(arrayOfBytes)
                let arrayToHexStr = toHex(arrayOfBytes, 0, arrayOfBytes.length) 
                let colonPartitionedHex = partition(arrayToHexStr, INTERVAL);
                let secretKey = new Scalar(fixEndian(colonPartitionedHex));
                return secretKey
              }

            serializeToHexStr(s) {
                return stripColon(s);
            }
        }
       }
        exports.init = (module) => {
            return new Promise(resolve => {
            if(isNodeJs){
                const fs = require('fs');
                const buf = fs.readFileSync('./dist/pairing_bg.wasm')
                WebAssembly.instantiate(buf).then((result) =>{
                    let mod = {};
                    mod['wasm'] = result.instance.exports;
                    exports.mod = mod;
                    setup(exports)
                    resolve()
                    
                })
            }
            else{
                if (typeof module === 'undefined') {
                    //module = import.meta.url.replace(/\.js$/, '_bg.wasm');
                    module = "http://localhost:8080/dist/pairing_bg.wasm";
                }
                let result;
                const imports = {};
    
                if (module instanceof URL || typeof module === 'string' || module instanceof Request) {
    
                    const response = fetch(module);
                    if (typeof WebAssembly.instantiateStreaming === 'function') {
                        result = WebAssembly.instantiateStreaming(response, imports)
                        .catch(e => {
                            console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                            return response
                            .then(r => r.arrayBuffer())
                            .then(bytes => WebAssembly.instantiate(bytes, imports));
                        });
                    } else {
                        result = response
                        .then(r => r.arrayBuffer())
                        .then(bytes => WebAssembly.instantiate(bytes, imports));
                    }
                } else {
    
                    result = WebAssembly.instantiate(module, imports)
                    .then(result => {
                        if (result instanceof WebAssembly.Instance) {
                            return { instance: result, module };
                        } else {
                            return result;
                        }
                    });
                }
                return result.then(({instance, module}) => {
                    wasm = instance.exports;
                    //init.__wbindgen_wasm_module = module;
                    exports.__wbindgen_wasm_module = module;
                    exports.mod.wasm = wasm;// eslint-disable-line
                    //exports.cryptoGetRandomValues = _cryptoGetRandomValues
                    exports.mod.onRuntimeInitialized = () => {
                    setup(exports)
                    resolve()
                  }
    
    
                    //return wasm;
                });
            }
        })
            console.log("Failed to run")
        }
    

        return exports
    }) 