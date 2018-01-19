import { 
    YoudaoApi,
    YoudaoOcrApi
 } from "../constants/ApiUtil";
import * as Types from '../constants/ActionTypes';
import { ChangeErrorMsg } from "../constants/ErrorMsg";
import {
    DeviceEventEmitter
} from "react-native";

/* 传入base64的图片 */
export const OCRTranslate = (img) => {

    return dispatch => {
        dispatch({
            type: Types.OCR_REQUEST_START,
        });
        /* 测试 */
        setTimeout(() => {
        /* 正常 */
        // YoudaoOcrApi(img).then(resData=>{
            let resData = JSON.parse(JSON.stringify(testData))
            console.log('====resData====');
            console.log(resData);
            console.log('========');
            if (resData["errorCode"] === '0' && resData["Result"]) {
                console.log('请求成功');
                
                const result = resData["Result"];
                const language = result["language"];
                const regions = result["regions"][0];
                const lines = regions["lines"];
                var count = 0;
                //暂时图片识别只能识别英文和中文  en  zh_CN
                function handle(translation, i) {
                    lines[i]["translation"] = translation[0];
                    if (count === lines.length) {
                        //全部翻译完成
                        dispatch({
                            type: Types.OCR_REQUEST_SUCCESS,
                            data: resData["Result"]
                        });
                        DeviceEventEmitter.emit('PushOCRResultPage');
                    }
                }

                for (let index = 0; index < lines.length; index++) {
                    const element = lines[index];
                    const words = element["words"];
                    //把每行的单词组起一句
                    var texts = "";
                    for (let index = 0; index < words.length; index++) {
                        const text = words[index]["text"];
                        texts = texts + text;
                    }
                    element["words"] = texts;
                    YoudaoApi(texts, 'EN','zh-CHS' ).then(res => {
                        if (res.errorCode === "0") {
                            console.log(index + "--===--" + res.query);
                            count++;
                            handle(res.translation, index);
                        } else {
                            //翻译有错的话就直接把该文本返回
                            count++;
                            handle(words, index);
                        }
                    }).catch(err => {
                         //翻译失败的话就直接把该文本返回
                        count++;
                        handle(words, index);
                    });

                }

            }else{
                console.log('====errorCode====');
                console.log(resData.errorCode);
                console.log('========');
                dispatch({
                    type: Types.OCR_REQUEST_ERR,
                    errorMsg:  ChangeErrorMsg(parseInt(resData.errorCode)) 
                })
            }
        /* 测试 */
        }, 1000);
        /* 正常 */
        // }).catch(err=>{
        //     console.log('====err====');
        //     console.log(err);
        //     console.log('========');
        //     dispatch({
        //         type: Types.OCR_REQUEST_ERR,
        //         errorMsg: '请求失败: err' + err
        //     })
        // })
        /* ------ */

        
        // dispatch({
        //     type: Types.OCR_REQUEST_SUCCESS,
        //     data: resData["Result"]
        // });
        // DeviceEventEmitter.emit('PushOCRResultPage');
            // dispatch({
            //     type: Types.REQUEST_ERR,
            //     errorMsg: '图片识别请求失败: err' 
            // })
    }
}


const testData = {
    errorCode: '0',
    Result: {
        orientation: 'Up',
        regions: [{
            boundingBox: '12,8,583,515',
            lines: [
            {
                boundingBox: '12,9,48,22',
                words: [{
                    boundingBox: '12,9,48,22',
                    text: 'iPod'
                }]
            },
            {
                boundingBox: '274,8,97,25',
                words: [{
                    boundingBox: '274,8,23,24',
                    text: '下'
                },
                {
                    boundingBox: '298,8,24,25',
                    text: '午'
                },
                {
                    boundingBox: '323,12,14,17',
                    text: '4'
                },
                {
                    boundingBox: '339,13,6,14',
                    text: ':'
                },
                {
                    boundingBox: '346,10,25,20',
                    text: '13'
                }
                ]
            },
            {
                boundingBox: '248,66,142,36',
                words: [{
                    boundingBox: '248,66,35,36',
                    text: '找'
                },
                {
                    boundingBox: '287,69,29,31',
                    text: '回'
                },
                {
                    boundingBox: '321,66,33,36',
                    text: '密'
                },
                {
                    boundingBox: '356,68,33,33',
                    text: '码'
                }
                ]
            },
            {
                boundingBox: '25,151,376,34',
                words: [{
                    boundingBox: '25,156,33,30',
                    text: '6'
                },
                {
                    boundingBox: '73,154,27,27',
                    text: '手'
                },
                {
                    boundingBox: '100,154,28,28',
                    text: '机'
                },
                {
                    boundingBox: '128,155,27,26',
                    text: '号'
                },
                {
                    boundingBox: '157,155,26,27',
                    text: '码'
                },
                {
                    boundingBox: '185,163,5,16',
                    text: ':'
                },
                {
                    boundingBox: '207,151,195,24',
                    text: '134:44-0000'
                }
                ]
            },
            {
                boundingBox: '72,197,195,28',
                words: [{
                    boundingBox: '72,197,27,28',
                    text: '绑'
                },
                {
                    boundingBox: '99,197,29,28',
                    text: '定'
                },
                {
                    boundingBox: '128,198,28,27',
                    text: '账'
                },
                {
                    boundingBox: '157,198,26,27',
                    text: '号'
                },
                {
                    boundingBox: '186,207,5,14',
                    text: ':'
                },
                {
                    boundingBox: '200,201,67,21',
                    text: 'meat'
                }
                ]
            },
            {
                boundingBox: '25,283,219,27',
                words: [{
                    boundingBox: '25,283,25,27',
                    text: '密'
                },
                {
                    boundingBox: '53,284,26,26',
                    text: '码'
                },
                {
                    boundingBox: '82,292,4,15',
                    text: ':'
                },
                {
                    boundingBox: '125,288,18,16',
                    text: 'o'
                },
                {
                    boundingBox: '145,288,18,17',
                    text: '.'
                },
                {
                    boundingBox: '166,288,18,17',
                    text: '.'
                },
                {
                    boundingBox: '206,290,19,13',
                    text: 'o'
                },
                {
                    boundingBox: '227,289,18,15',
                    text: '.'
                }
                ]
            },
            {
                boundingBox: '26,373,569,29',
                words: [{
                    boundingBox: '26,376,14,20',
                    text: '6'
                },
                {
                    boundingBox: '42,385,17,6',
                    text: 'n'
                },
                {
                    boundingBox: '57,377,35,20',
                    text: '20'
                },
                {
                    boundingBox: '93,373,27,28',
                    text: '位'
                },
                {
                    boundingBox: '121,373,27,28',
                    text: '字'
                },
                {
                    boundingBox: '148,373,27,28',
                    text: '符'
                },
                {
                    boundingBox: '178,393,6,9',
                    text: ','
                },
                {
                    boundingBox: '204,373,28,27',
                    text: '建'
                },
                {
                    boundingBox: '233,373,26,27',
                    text: '议'
                },
                {
                    boundingBox: '260,373,26,28',
                    text: '为'
                },
                {
                    boundingBox: '288,373,27,27',
                    text: '字'
                },
                {
                    boundingBox: '317,374,26,27',
                    text: '母'
                },
                {
                    boundingBox: '347,392,7,7',
                    text: '、'
                },
                {
                    boundingBox: '373,373,27,28',
                    text: '数'
                },
                {
                    boundingBox: '400,373,29,27',
                    text: '字'
                },
                {
                    boundingBox: '431,392,8,8',
                    text: '、'
                },
                {
                    boundingBox: '456,373,28,28',
                    text: '符'
                },
                {
                    boundingBox: '484,373,27,28',
                    text: '号'
                },
                {
                    boundingBox: '513,373,25,26',
                    text: '的'
                },
                {
                    boundingBox: '541,373,27,27',
                    text: '组'
                },
                {
                    boundingBox: '568,373,27,27',
                    text: '合'
                }
                ]
            },
            {
                boundingBox: '215,490,209,32',
                words: [{
                    boundingBox: '215,491,30,30',
                    text: '新'
                },
                {
                    boundingBox: '245,491,30,31',
                    text: '密'
                },
                {
                    boundingBox: '275,492,29,30',
                    text: '码'
                },
                {
                    boundingBox: '306,491,28,30',
                    text: '设'
                },
                {
                    boundingBox: '336,492,29,30',
                    text: '置'
                },
                {
                    boundingBox: '365,490,29,31',
                    text: '成'
                },
                {
                    boundingBox: '395,491,29,32',
                    text: '功'
                }
                ]
            }
            ]
        }],
        textAngle: 0,
        language: 'en'
    }
}
