import * as Types from "../constants/ActionTypes";

let initialState = {
    loading: false,
    data: {},
    pushAction: false
}

let ocrReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.REQUEST_SUCCESS:
            return{
                ...state,
                loading:false,
                data: action.data,
                pushAction: true
            }
            break;  
        
        case Types.REQUEST_START:
            return{
                ...state,
                loading: true
            }
            break;

        case Types.PUSH_OCRRESULTPAGE_SUCCESS:
            return{
                ...state,
                pushAction:false
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