import * as Types from "../constants/ActionTypes";

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
    
        default:
            return {
                ...state
            }
            break;
    }


}

export default wordsReducer;