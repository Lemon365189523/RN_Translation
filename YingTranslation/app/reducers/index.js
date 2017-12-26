
import { combineReducers } from 'redux';
import main from './mainReducer';
import words from './wordsReducer';
import ocr from './ocrReducer';

export default reducers = combineReducers({
    main,
    words,
    ocr
})