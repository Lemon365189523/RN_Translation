import * as Types from "../constants/ActionTypes";
import {
    DeviceEventEmitter
} from 'react-native';

let initialState = {
    collectionWords: []
}

const wordsReducer = (state = initialState ,action) => {

    switch (action.type) {
        case Types.GET_ALL_COLLECTION_WORDS:
            
            return{
                ...state,
                collectionWords: action.words
            }
            
            break;
        case Types.REMOVE_WORD_SUCCESS:
            DeviceEventEmitter.emit('WordsPageUpdate');
            DeviceEventEmitter.emit('RemoveWord', word);
            return{
                ...state
            }

             break;
        default:
            return {
                ...state
            }
            break;
    }


}

export default wordsReducer;