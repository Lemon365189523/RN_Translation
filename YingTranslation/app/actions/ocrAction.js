import { POST } from '../constants/Networking';
import { YOUDAO_HTTP } from "../constants/Urls";
import MD5 from "crypto-js/md5";
import * as Types from '../constants/ActionTypes';

/* 传入base64的图片 */
export const OCRTranslate = (img) => {
    var appkey = "3d67d5327743f0d9";
    var salt = "10086";
    var sign = MD5(appkey + salt + "6HY64UvqIuzG4pBxjTkoENjrS6ApUljI").toString();
    return dispatch => {
        dispatch({
            type: Types.REQUEST_START,
        })
        setTimeout(() => {
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: testData
            })
        }, 2000);
        
    }
}

const testData = {
    "errorCode": "0",
    "Result": {
        "orientation": "Up",
        "textAngle": 0,
        "language": "en",
        "lines": [
            {
                "boundingBox": "351,685,465,84",
                "words": "ABSOLUE"
            },
            {
                "boundingBox": "361,796,450,56",
                "words": "PRECIOUS CELLS"
            },
            {
                "boundingBox": "217,880,696,55",
                "words": "SOIN INTENSE REGENERATIF ET REPARATEUR"
            },
            {
                "boundingBox": "197,920,787,65",
                "words": "ADVANCED REGENERATING AND REPAIRING CARE SPF"
            }
        ]
    }
}
