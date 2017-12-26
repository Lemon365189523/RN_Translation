import * as Types from "../constants/ActionTypes";

let initialState = {
    loading: false,
    data: {}
}

let ocrReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.REQUEST_SUCCESS:
            return{
                ...state,
                loading:false
            }
            break;  
        
        case Types.REQUEST_START:
            return{
                ...state,
                loading: true
            }
            break;
        default:
            return{
                ...state
            }
            break;
    }

}

export default ocrReducer;