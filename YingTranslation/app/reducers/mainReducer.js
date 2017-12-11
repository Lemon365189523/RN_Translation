
import * as Types from "../constants/ActionTypes";

let initialState = {
    data: {},
    isLoading: false,
}

let mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.REQUEST_START:
            return {
                ...state,
                isLoading: true
            }
            break;
        
        case Types.REQUEST_SUCCESS:
            
            return {
                isLoading: false,
                data: action.data
            }
            break;

        case Types.REQUEST_ERR:

            break;  
        default:
            return {
                ...state
            }
            break;
    }

}


export default mainReducer;