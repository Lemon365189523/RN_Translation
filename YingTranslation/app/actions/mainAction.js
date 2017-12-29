

import * as Types from '../constants/ActionTypes';
import * as WordsStorage from '../constants/WordsStorage';
import { YoudaoApi } from "../constants/ApiUtil";

import { 
    DeviceEventEmitter
 } from 'react-native';

export const translate = (word, toCoding, fromCoding ) => {
    
    return dispatch => {
        dispatch({
            type: Types.REQUEST_START
        })
        //先看看收藏有没有先在请求网络id: resJson.l + resJson.query
        console.log("id:---->" + fromCoding + "2" + toCoding + word);
        WordsStorage.findWord(
            fromCoding + "2" + toCoding + word
        ).then(data => {
            console.log('单词从数据库拿');
            dispatch({
                type: Types.REQUEST_SUCCESS,
                data: data
            })
        }).catch((err)=>{
            console.log('请求网络');
            YoudaoApi(word, toCoding, fromCoding)
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