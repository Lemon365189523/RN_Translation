import React, { Component } from "react";
import OCRResultPage from "../pages/OCRPage/OCRResultPage";
import * as ocrResultCreators from '../actions/ocrResultAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  
    Modal
} from "react-native";
class OCRResultContainer extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <OCRResultPage {...this.props} />
        )
    }
}

//过滤state
const mapStateToProps = (state) => {
    const { ocrResult } = state;
    return {
        ocrResult
    };
};

//过滤action
const mapDispatchToProps = (dispatch) => {
    const resultDispatch = bindActionCreators(ocrResultCreators, dispatch);
    return {
        resultDispatch
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(OCRResultContainer);