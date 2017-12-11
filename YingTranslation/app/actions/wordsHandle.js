import * as Types from '../constants/ActionTypes';

const collectionID = '10086';


export const collectionWord = (word, data) => {
    console.log(word);
    console.log(data);
    return dispatch =>{
        global.storage.save({
            key: word,
            id: collectionID,
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

export const findAllCollectionWord = () =>{

    return dispatch => {
        global.storage.load(
            {key: 'test'}
        ).then(wrods => {
            console.log('获取所有收藏单词成功');
            console.log(words);
            // dispatch({
            //     type: Types.GET_ALL_COLLECTION_WORDS,
            //     words: wrods
            // });
        }).catch(err => {
            console.log('获取所有收藏单词失败');
            console.log(err);
            // dispatch({
            //     type: Types.GET_ALL_COLLECTION_WORDS,
            //     words: []
            // })
        });
    }
}