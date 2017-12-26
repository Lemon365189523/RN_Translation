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
import { YOUDAO_HTTP } from "../constants/Urls";
import MD5 from "crypto-js/md5";
import * as Types from '../constants/ActionTypes';
import * as WordsStorage from '../constants/WordsStorage';

import { 
    DeviceEventEmitter
 } from 'react-native';

export const translate = (word, toCoding, fromCoding ) => {
    var q = word;
    var f = fromCoding;
    var to = toCoding;
    var appkey = "3d67d5327743f0d9";
    var salt =  "10086";
    var sign = MD5(appkey + q + salt + "6HY64UvqIuzG4pBxjTkoENjrS6ApUljI").toString();
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
        dispatch({
            type: Types.REQUEST_START
        })
        //先看看收藏有没有先在请求网络id: resJson.l + resJson.query
        console.log("id:---->" +  f + "2" + to + q);
        WordsStorage.findWord(
            f+"2"+to+q
        ).then(data => {
            console.log('单词从数据库拿');
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: data
            })
        }).catch((err)=>{
            console.log('请求网络');
            POST(YOUDAO_HTTP, params)
                .then((resJson) => {
                    console.log('============网络解析=======================');
                    console.log(resJson);
                    console.log('=======================================');
                    if (resJson.errorCode === "0" && resJson.query){
                        
                        WordsStorage.findWord(
                            resJson.l + resJson.query
                        ).then(data => {
                            dispatch({
                                type: Types.REQUEST_SUCCESS,
                                data: data
                            })
                        }).catch(err => {
                            resJson.mark = false;
                            console.log('单词从网络拿');
                            dispatch({
                                type: Types.REQUEST_SUCCESS,
                                data: resJson
                            })
                        });
                    }else{
                        dispatch({
                            type: Types.REQUEST_ERR,
                            errorMsg: "查询没有该单词"
                        })
                    }

     
                }).catch((err) => {
                    console.log(err.message);
                    dispatch({
                        type: Types.REQUEST_ERR,
                        errorMsg: "网络请求失败"
                    })
                });
        })

       
    }
};


export const markWord = (word) =>{
    
    return dispatch => {
        WordsStorage.collectionWord(
            word
        ).then((newWord)=>{
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: newWord
            });
            DeviceEventEmitter.emit('WordsPageUpdate');
        }).catch(err => {

        });
    }
}
 
export const removeWord = (word) => {

    return dispatch => {
        WordsStorage.removeWord(
            word
        ).then((newWord) => {
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: newWord
            });
            DeviceEventEmitter.emit('WordsPageUpdate');
        }).catch(err => {

        });
    }
}

export const removeMark = (word) =>{
    return dispatch => {
        word.mark = false;
        dispatch({
            type: Types.REQUEST_SUCCESS,
            data: word
        });
    }
}