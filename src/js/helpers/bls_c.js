
let Module = (function() {
    let _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    return (
        function(Module) {
            Module = Module || {};
  
            var Module=typeof Module!=="undefined"?Module:{};
            let moduleOverrides={};
            let key;
            for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";
            Module["quit"]=function(status,toThrow){throw toThrow};
            Module["preRun"]=[];
            Module["postRun"]=[];let ENVIRONMENT_IS_WEB=false;let ENVIRONMENT_IS_WORKER=false;let ENVIRONMENT_IS_NODE=false;let ENVIRONMENT_IS_SHELL=false;
            ENVIRONMENT_IS_WEB=typeof window==="object";
            ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;let scriptDirectory="";
            function locateFile(path){if(Module["locateFile"]){
                return Module["locateFile"](path,scriptDirectory)}
            else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";
            let nodeFS;
            let nodePath;
            Module["read"]=function shell_read(filename,binary){
                let ret;if(!nodeFS)
            nodeFS=require("fs");if(!nodePath)
            nodePath=require("path");
            filename=nodePath["normalize"](filename);
            ret=nodeFS["readFileSync"](filename);
            return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){let ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);Module["quit"]=function(status){process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){return read(f)}}Module["readBinary"]=function readBinary(f){let data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=function(status){quit(status)}}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}Module["read"]=function shell_read(url){let xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){let xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){let xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)};Module["setWindowTitle"]=function(title){document.title=title}}else{}let out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);let err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;let asm2wasmImports={"f64-rem":function(x,y){return x%y},"debugger":function(){debugger}};let functionPointers=new Array(0);if(typeof WebAssembly!=="object"){err("no native wasm support detected")}let wasmMemory;let wasmTable;let ABORT=false;let EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}let UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;let UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;let WASM_PAGE_SIZE=65536;let buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}let DYNAMIC_BASE=5309840,DYNAMICTOP_PTR=66928;let TOTAL_STACK=5242880;let INITIAL_TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+INITIAL_TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){wasmMemory=new WebAssembly.Memory({"initial":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=wasmMemory.buffer}else{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY)}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){let callback=callbacks.shift();if(typeof callback=="function"){callback();continue}let func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}let __ATPRERUN__=[];let __ATINIT__=[];let __ATMAIN__=[];let __ATPOSTRUN__=[];let runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}let runDependencies=0;let runDependencyWatcher=null;let dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){let callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};let dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}
            let wasmBinaryFile="./bls_c.wasm";
            if(!isDataURI(wasmBinaryFile)){
                wasmBinaryFile=locateFile(wasmBinaryFile)
                wasmBinaryFile=location.origin+"/dist"+wasmBinaryFile
            }
            function getBinary(){
                try{
                    if(Module["wasmBinary"]){
                        console.log("Module['wasmBinary]")
                        return new Uint8Array(Module["wasmBinary"])}
                    if(Module["readBinary"]){
                        console.log("File name" + wasmBinaryFile)
                        return Module["readBinary"](wasmBinaryFile)
                    }else{
                        throw"both async and sync fetching of the wasm failed"}
                }catch(err){abort(err)}}
            function getBinaryPromise(){
                if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){
                    return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){
                        if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}
                        return response["arrayBuffer"]()}).catch(function(){
                            return getBinary()})}
                            return new Promise(function(resolve,reject){
                                resolve(getBinary())})}
                                function createWasm(env){
                    let info={"env":env,"global":{"NaN":NaN,Infinity:Infinity},"global.Math":Math,"asm2wasm":asm2wasmImports};
                    function receiveInstance(instance,module){
                    let exports=instance.exports;
                    Module["asm"]=exports;
                    removeRunDependency("wasm-instantiate")}
                    addRunDependency("wasm-instantiate");
                    if(Module["instantiateWasm"]){
                        try{
                            return Module["instantiateWasm"](info,receiveInstance)
                        }catch(e){err("Module.instantiateWasm callback failed with error: "+e);
                        return false}}
                    function receiveInstantiatedSource(output){receiveInstance(output["instance"])}
                    function instantiateArrayBuffer(receiver){getBinaryPromise().then(function(binary){
                        return WebAssembly.instantiate(binary,info)}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){
                WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)})}else{instantiateArrayBuffer(receiveInstantiatedSource)}return{}}Module["asm"]=function(global,env,providedBuffer){env["memory"]=wasmMemory;env["table"]=wasmTable=new WebAssembly.Table({"initial":232,"maximum":232,"element":"anyfunc"});env["__memory_base"]=1024;env["__table_base"]=0;let exports=createWasm(env);return exports};__ATINIT__.push({func:function(){globalCtors()}});function _emscripten_get_heap_size(){return HEAP8.length}
            function _emscripten_resize_heap(requestedSize){return false}
            function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest)}
            function ___setErrNo(value){
                if(Module["___errno_location"])
                    HEAP32[Module["___errno_location"]()>>2]=value;
                    return value}
            let asmGlobalArg={};
            let asmLibraryArg={"b":abort,"c":___setErrNo,"f":_emscripten_get_heap_size,"e":_emscripten_memcpy_big,"d":_emscripten_resize_heap,"a":DYNAMICTOP_PTR};
            let asm=Module["asm"](asmGlobalArg,asmLibraryArg,buffer);Module["asm"]=asm;let ___errno_location=Module["___errno_location"]=function(){return Module["asm"]["g"].apply(null,arguments)};let _blsDHKeyExchange=Module["_blsDHKeyExchange"]=function(){return Module["asm"]["h"].apply(null,arguments)};let _blsFree=Module["_blsFree"]=function(){return Module["asm"]["i"].apply(null,arguments)};let _blsGetCurveOrder=Module["_blsGetCurveOrder"]=function(){return Module["asm"]["j"].apply(null,arguments)};let _blsGetFieldOrder=Module["_blsGetFieldOrder"]=function(){return Module["asm"]["k"].apply(null,arguments)};let _blsGetFrByteSize=Module["_blsGetFrByteSize"]=function(){return Module["asm"]["l"].apply(null,arguments)};let _blsGetG1ByteSize=Module["_blsGetG1ByteSize"]=function(){return Module["asm"]["m"].apply(null,arguments)};let _blsGetGeneratorOfPublicKey=Module["_blsGetGeneratorOfPublicKey"]=function(){return Module["asm"]["n"].apply(null,arguments)};let _blsGetOpUnitSize=Module["_blsGetOpUnitSize"]=function(){return Module["asm"]["o"].apply(null,arguments)};let _blsGetPop=Module["_blsGetPop"]=function(){return Module["asm"]["p"].apply(null,arguments)};let _blsGetPublicKey=Module["_blsGetPublicKey"]=function(){return Module["asm"]["q"].apply(null,arguments)};let _blsGetSerializedPublicKeyByteSize=Module["_blsGetSerializedPublicKeyByteSize"]=function(){return Module["asm"]["r"].apply(null,arguments)};let _blsGetSerializedSecretKeyByteSize=Module["_blsGetSerializedSecretKeyByteSize"]=function(){return Module["asm"]["s"].apply(null,arguments)};let _blsGetSerializedSignatureByteSize=Module["_blsGetSerializedSignatureByteSize"]=function(){return Module["asm"]["t"].apply(null,arguments)};let _blsHashToSecretKey=Module["_blsHashToSecretKey"]=function(){return Module["asm"]["u"].apply(null,arguments)};let _blsHashToSignature=Module["_blsHashToSignature"]=function(){return Module["asm"]["v"].apply(null,arguments)};let _blsIdDeserialize=Module["_blsIdDeserialize"]=function(){return Module["asm"]["w"].apply(null,arguments)};let _blsIdGetDecStr=Module["_blsIdGetDecStr"]=function(){return Module["asm"]["x"].apply(null,arguments)};let _blsIdGetHexStr=Module["_blsIdGetHexStr"]=function(){return Module["asm"]["y"].apply(null,arguments)};let _blsIdGetLittleEndian=Module["_blsIdGetLittleEndian"]=function(){return Module["asm"]["z"].apply(null,arguments)};let _blsIdIsEqual=Module["_blsIdIsEqual"]=function(){return Module["asm"]["A"].apply(null,arguments)};let _blsIdSerialize=Module["_blsIdSerialize"]=function(){return Module["asm"]["B"].apply(null,arguments)};let _blsIdSetDecStr=Module["_blsIdSetDecStr"]=function(){return Module["asm"]["C"].apply(null,arguments)};let _blsIdSetHexStr=Module["_blsIdSetHexStr"]=function(){return Module["asm"]["D"].apply(null,arguments)};let _blsIdSetInt=Module["_blsIdSetInt"]=function(){return Module["asm"]["E"].apply(null,arguments)};let _blsIdSetLittleEndian=Module["_blsIdSetLittleEndian"]=function(){return Module["asm"]["F"].apply(null,arguments)};let _blsInit=Module["_blsInit"]=function(){return Module["asm"]["G"].apply(null,arguments)};let _blsMalloc=Module["_blsMalloc"]=function(){return Module["asm"]["H"].apply(null,arguments)};let _blsPublicKeyAdd=Module["_blsPublicKeyAdd"]=function(){return Module["asm"]["I"].apply(null,arguments)};let _blsPublicKeyDeserialize=Module["_blsPublicKeyDeserialize"]=function(){return Module["asm"]["J"].apply(null,arguments)};let _blsPublicKeyGetHexStr=Module["_blsPublicKeyGetHexStr"]=function(){return Module["asm"]["K"].apply(null,arguments)};let _blsPublicKeyIsEqual=Module["_blsPublicKeyIsEqual"]=function(){return Module["asm"]["L"].apply(null,arguments)};let _blsPublicKeyIsValidOrder=Module["_blsPublicKeyIsValidOrder"]=function(){return Module["asm"]["M"].apply(null,arguments)};let _blsPublicKeyRecover=Module["_blsPublicKeyRecover"]=function(){return Module["asm"]["N"].apply(null,arguments)};
            let _blsPublicKeySerialize=Module["_blsPublicKeySerialize"]=function(){return Module["asm"]["O"].apply(null,arguments)};
            let _blsPublicKeySetHexStr=Module["_blsPublicKeySetHexStr"]=function(){return Module["asm"]["P"].apply(null,arguments)};
            let _blsPublicKeyShare=Module["_blsPublicKeyShare"]=function(){return Module["asm"]["Q"].apply(null,arguments)};
            let _blsPublicKeySub=Module["_blsPublicKeySub"]=function(){return Module["asm"]["R"].apply(null,arguments)};
            let _blsPublicKeyVerifyOrder=Module["_blsPublicKeyVerifyOrder"]=function(){return Module["asm"]["S"].apply(null,arguments)};let _blsSecretKeyAdd=Module["_blsSecretKeyAdd"]=function(){return Module["asm"]["T"].apply(null,arguments)};let _blsSecretKeyDeserialize=Module["_blsSecretKeyDeserialize"]=function(){return Module["asm"]["U"].apply(null,arguments)};
            let _blsSecretKeyGetDecStr=Module["_blsSecretKeyGetDecStr"]=function(){return Module["asm"]["V"].apply(null,arguments)};
            let _blsSecretKeyGetHexStr=Module["_blsSecretKeyGetHexStr"]=function(){return Module["asm"]["W"].apply(null,arguments)};
            let _blsSecretKeyGetLittleEndian=Module["_blsSecretKeyGetLittleEndian"]=function(){return Module["asm"]["X"].apply(null,arguments)};let _blsSecretKeyIsEqual=Module["_blsSecretKeyIsEqual"]=function(){return Module["asm"]["Y"].apply(null,arguments)};
            let _blsSecretKeyRecover=Module["_blsSecretKeyRecover"]=function(){return Module["asm"]["Z"].apply(null,arguments)};
            let _blsSecretKeySerialize=Module["_blsSecretKeySerialize"]=function(){return Module["asm"]["_"].apply(null,arguments)};let _blsSecretKeySetDecStr=Module["_blsSecretKeySetDecStr"]=function(){return Module["asm"]["$"].apply(null,arguments)};
            let _blsSecretKeySetHexStr=Module["_blsSecretKeySetHexStr"]=function(){return Module["asm"]["aa"].apply(null,arguments)};let _blsSecretKeySetLittleEndian=Module["_blsSecretKeySetLittleEndian"]=function(){return Module["asm"]["ba"].apply(null,arguments)};
            let _blsSecretKeySetLittleEndianMod=Module["_blsSecretKeySetLittleEndianMod"]=function(){return Module["asm"]["ca"].apply(null,arguments)};
            let _blsSecretKeyShare=Module["_blsSecretKeyShare"]=function(){return Module["asm"]["da"].apply(null,arguments)};let _blsSecretKeySub=Module["_blsSecretKeySub"]=function(){return Module["asm"]["ea"].apply(null,arguments)};
            let _blsSetETHserialization=Module["_blsSetETHserialization"]=function(){return Module["asm"]["fa"].apply(null,arguments)};
            let _blsSign=Module["_blsSign"]=function(){return Module["asm"]["ga"].apply(null,arguments)};
            let _blsSignHash=Module["_blsSignHash"]=function(){return Module["asm"]["ha"].apply(null,arguments)};
            let _blsSignatureAdd=Module["_blsSignatureAdd"]=function(){return Module["asm"]["ia"].apply(null,arguments)};
            let _blsSignatureDeserialize=Module["_blsSignatureDeserialize"]=function(){return Module["asm"]["ja"].apply(null,arguments)};
            let _blsSignatureGetHexStr=Module["_blsSignatureGetHexStr"]=function(){return Module["asm"]["ka"].apply(null,arguments)};
            let _blsSignatureIsEqual=Module["_blsSignatureIsEqual"]=function(){return Module["asm"]["la"].apply(null,arguments)};
            let _blsSignatureIsValidOrder=Module["_blsSignatureIsValidOrder"]=function(){return Module["asm"]["ma"].apply(null,arguments)};
            let _blsSignatureRecover=Module["_blsSignatureRecover"]=function(){return Module["asm"]["na"].apply(null,arguments)};
            let _blsSignatureSerialize=Module["_blsSignatureSerialize"]=function(){return Module["asm"]["oa"].apply(null,arguments)};
            let _blsSignatureSetHexStr=Module["_blsSignatureSetHexStr"]=function(){
                return Module["asm"]["pa"].apply(null,arguments)};let _blsSignatureSub=Module["_blsSignatureSub"]=function(){return Module["asm"]["qa"].apply(null,arguments)};
            let _blsSignatureVerifyOrder=Module["_blsSignatureVerifyOrder"]=function(){return Module["asm"]["ra"].apply(null,arguments)};let _blsVerify=Module["_blsVerify"]=function(){
                return Module["asm"]["sa"].apply(null,arguments)};
            let _blsVerifyAggregatedHashes=Module["_blsVerifyAggregatedHashes"]=function(){
                return Module["asm"]["ta"].apply(null,arguments)};
            let _blsVerifyHash=Module["_blsVerifyHash"]=function(){
                return Module["asm"]["ua"].apply(null,arguments)};
            let _blsVerifyPairing=Module["_blsVerifyPairing"]=function(){
                return Module["asm"]["va"].apply(null,arguments)};
            let _blsVerifyPop=Module["_blsVerifyPop"]=function(){
                return Module["asm"]["wa"].apply(null,arguments)};
            var globalCtors=Module["globalCtors"]=function(){
                return Module["asm"]["ya"].apply(null,arguments)};
            let dynCall_vi=Module["dynCall_vi"]=function(){
                return Module["asm"]["xa"].apply(null,arguments)};
            Module["asm"]=asm;
            Module["then"]=function(func){
                if(Module["calledRun"]){
                    func(Module)
                }else{
                    let old=Module["onRuntimeInitialized"];
                    Module["onRuntimeInitialized"]=function(){
                        if(old)
                            old();
                        func(Module)
                }}
                return Module};
            function ExitStatus(status){
                this.name="ExitStatus";
                this.message="Program terminated with exit("+status+")";
                this.status=status
            }
            ExitStatus.prototype=new Error;
            ExitStatus.prototype.constructor=ExitStatus;
            dependenciesFulfilled=function runCaller(){
                if(!Module["calledRun"])
                    run();
                if(!Module["calledRun"])
                    dependenciesFulfilled=runCaller
            };
            function run(args){
                args=args||Module["arguments"];
                if(runDependencies>0){
                    return
                }
                preRun();
                if(runDependencies>0)
                    return;
                if(Module["calledRun"])
                    return;
                function doRun(){
                    if(Module["calledRun"])
                        return;
                    Module["calledRun"]=true;
                    if(ABORT)
                        return;
                    ensureInitRuntime();
                    preMain();
                    if(Module["onRuntimeInitialized"])
                        Module["onRuntimeInitialized"]();
                    postRun()
                }
                if(Module["setStatus"]){
                    Module["setStatus"]("Running...");
                    setTimeout(function(){
                        setTimeout(function(){
                        Module["setStatus"]("")},1);
                        doRun()},1)
                }else{
                    doRun()
            }}
            Module["run"]=run;
            function abort(what){
                if(Module["onAbort"]){
                    Module["onAbort"](what)}
                if(what!==undefined){
                    out(what);
                    err(what);
                    what=JSON.stringify(what)
                }else{what=""}
                ABORT=true;
                EXITSTATUS=1;
                throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}
            Module["abort"]=abort;
            if(Module["preInit"]){
                if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run();
  
  
            return Module
        }
    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = Module;
else if (typeof define === 'function' && define['amd'])
    define([], function() { return Module; });
else if (typeof exports === 'object')
    exports["Module"] = Module;
      