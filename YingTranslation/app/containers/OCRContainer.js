import React, { Component } from "react";

import OCRPage from "../pages/OCRPage/OCRPage";
import * as ocrCreators from '../actions/ocrAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class OCRContainer extends Component {

    static navigationOptions = {
        // header: null
    }

    render(){
        return(
            <OCRPage {...this.props}/>
        )
    }
} 

//过滤state
const mapStateToProps = (state) => {
    const { ocr } = state;

    return {
        ocr
    };
};

//过滤action
const mapDispatchToProps = (dispatch) => {
    const ocrDispatch = bindActionCreators(ocrCreators, dispatch);
    return {
        ocrDispatch
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OCRContainer);