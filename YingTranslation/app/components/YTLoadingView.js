import React ,{ Component } from 'react';
import {
    View,
    Modal
} from 'react-native';
import PropTypes from 'prop-types';

export default class YTLoadingView extends Component {

    constructor(props){
        super(props);
    }

    render(){

        const {visible} = this.props
 
        return(
            <Modal 
                animationType='fade' 
                visible={visible}
            >
            </Modal>
        )
    }
}

YTLoadingView.prototype = {
    visible: PropTypes.bool
}