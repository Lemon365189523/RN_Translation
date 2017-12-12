import * as Types from '../constants/ActionTypes';

const collectionKey = 'WordsStorageKey';


export const collectionWord = (word, data) => {

    return dispatch =>{
        global.storage.save({
            key: collectionKey,
            id: word,
            data: data
        }).then(() => {
            console.log('收藏成功');
            // dispatch({})
        }).catch((err) => {
            console.log('收藏失败');
            // dispatch({})
        });
    }
    
}

export const findAllCollectionWords = () =>{

    return dispatch => {
        global.storage.getAllDataForKey(
            collectionKey
        ).then(ret => {

            dispatch({
                type: Types.GET_ALL_COLLECTION_WORDS,
                words: ret
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

