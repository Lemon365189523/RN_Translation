import * as Types from "../constants/ActionTypes";

let initialState = {
    resultData: {},
    activity: false
}

let ocrResult = (state = initialState, action) => {

    switch (action.type) {
        
        case Types.OCRRESULT_SETDATA:
            return{
                ...state,
                resultData: action.data
            }

        break;

        case Types.REQUEST_START: 
            return{
                ...state,
                activity: true
            }
            break;

        case Types.REQUEST_SUCCESS:
            return{
                ...state,
                activity: false,
                resultData: action.data
            }
            break;
        default:
            return {
                ...state
            }
        break;
    }

}

export default ocrResult;