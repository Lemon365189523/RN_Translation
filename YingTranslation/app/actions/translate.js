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
import * as Types from '../constants/ActionTypes';

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

    return dispatch => {
        dispatch({
            type: Types.REQUEST_START
        })
        // POST(YOUDAO_HTTPS, params)
        //     .then((resJson)=>{
        //         console.log(resJson);
        //     }).catch((err)=>{
        //         console.log(err.message);
        //     });
        setTimeout(() => {
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: data
            })
        }, 0);
    }

}


 const data = {
    "web": [
        {
            "value": [
                "测试",
                "测验",
                "检验"
            ],
            "key": "Test"
        },
        {
            "value": [
                "Test Drive",
                "Test Drive",
                "无限狂飙"
            ],
            "key": "Test Drive"
        },
        {
            "value": [
                "测试员",
                "测试工程师",
                "软件测试工程师"
            ],
            "key": "Test Engineer"
        }
    ],
    "query": "test",
    "translation": [
        "试验"
    ],
    "errorCode": "0",
    "dict": {
        "url": "yddict://m.youdao.com/dict?le=eng&q=test"
    },
    "webdict": {
        "url": "http://m.youdao.com/dict?le=eng&q=test"
    },
    "basic": {
        "us-phonetic": "tɛst",
        "phonetic": "test",
        "uk-phonetic": "test",
        "speech": "test&type=1",
        "uk-speech": "test&type=1",
        "us-speech": "test&type=2",
        "explains": [
            "n. 试验；检验",
            "vt. 试验；测试",
            "vi. 试验；测试",
            "n. (Test)人名；(英)特斯特"
        ]
    },
    "l": "EN2zh-CHS"
}
 