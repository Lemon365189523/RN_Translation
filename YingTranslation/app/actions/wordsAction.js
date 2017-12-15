import * as Types from '../constants/ActionTypes';

import * as WordsStorage from "../constants/WordsStorage";

export const findAllCollectionWords = () =>{

    return dispatch => {
        WordsStorage.findAllCollectionWords().then(words => {
            dispatch({
                type: Types.GET_ALL_COLLECTION_WORDS,
                words: words
            });
        }).catch(err => {
            console.warn(err.message);
            dispatch({
                type: Types.GET_ALL_COLLECTION_WORDS,
                words: []
            })
        });
    }
}

