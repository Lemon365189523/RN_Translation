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
import {POST} from '../constants/Networking';
import { YOUDAO_HTTPS } from "../constants/Urls";
import MD5 from "crypto-js/md5";

export let translate = (word) => {
    var q = word;
    var f = "EN";
    var to = "zh-CHS";
    var appkey = "3d67d5327743f0d9";
    var salt =  "10086";
    var sign = MD5(appkey + q + salt + "6HY64UvqIuzG4pBxjTkoENjrS6ApUljI").toString();
    console.log(sign);
    var params = {
        "q": q,
        "to": to,
        "from": f,
        "sign": sign,
        "salt": salt,
        "appKey": appkey
    };
    console.log(params);
    return dispatch => {
      
        POST(YOUDAO_HTTPS, params)
            .then((resJson)=>{
                console.log(resJson);
            }).catch((err)=>{
                console.log(err.message);
            })

    }

}