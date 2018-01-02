import * as Types from "../constants/ActionTypes";
import { 
    DeviceEventEmitter
 } from "react-native";
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
        case Types.REQUEST_ERR:
            DeviceEventEmitter.emit('OCRPageShowToast', action.errorMsg);
            return {
                ...state,
                loading: false
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