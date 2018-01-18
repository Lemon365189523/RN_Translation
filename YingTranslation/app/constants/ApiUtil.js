import { YOUDAO_HTTP, OCRAPI_HTTP } from "./Urls";
import { POST } from './Networking';
import MD5 from "crypto-js/md5";
/* 翻译Action */
/**
中文	zh-CHS
日文	ja
英文	EN
韩文	ko
法文	fr
俄文	ru
葡萄牙文	pt
西班牙文	es
 */
export const YoudaoApi = (word, toCoding, fromCoding ) =>{
    var q = word;
    var f = fromCoding;
    var to = toCoding;
    var appkey = "3d67d5327743f0d9";
    var salt = "10086";
    var sign = MD5(appkey + q + salt + "6HY64UvqIuzG4pBxjTkoENjrS6ApUljI").toString();
    var params = {
        "q": q,
        "to": to,
        "from": f,
        "sign": sign,
        "salt": salt,
        "appKey": appkey
    };

    return POST(YOUDAO_HTTP, params);
}


export const YoudaoOcrApi = (imgBase64) =>{
    //目前支持英文：en，和中英混合：zh-en
    var appkey = "3d67d5327743f0d9"; //"0d7f50006e25dc88"
    var salt = "10086";
    var params = {
        "img": imgBase64,
        "sign": MD5(appkey + imgBase64 + salt + "6HY64UvqIuzG4pBxjTkoENjrS6ApUljI").toString(),
        "salt": salt,
        "appKey": appkey,
        "detectType": "10011",
        "imageType":"1",
        "docType":"json",
        "langType":"zh-en"
    };
    return POST(OCRAPI_HTTP, params);
}