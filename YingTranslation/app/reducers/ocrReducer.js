import * as Types from "../constants/ActionTypes";
import { 
    DeviceEventEmitter
 } from "react-native";
let initialState = {
    loading: false,
    data: {},
}

let ocrReducer = (state = initialState, action) => {

    switch (action.type) {
        case Types.OCR_REQUEST_SUCCESS:
            return{
                ...state,
                loading:false,
                data: action.data,
            }
            break;  
        
        case Types.OCR_REQUEST_START:
            return{
                ...state,
                loading: true,
            }
            break;

        case Types.OCR_REQUEST_ERR:
            DeviceEventEmitter.emit('OCRPageShowToast', action.errorMsg);
            return {
                ...state,
                loading: false,
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