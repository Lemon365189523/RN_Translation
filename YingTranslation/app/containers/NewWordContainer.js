import React from 'react';
import {
    View,
    Text
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as wrodsCreators from '../actions/wordsAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WordsPage from "../pages/words/WordsPage";

class WordsContainer extends React.Component {
    static navigationOptions = {
        title: '生词本',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-create" size={25} color={tintColor} />
        )
    };

    render() {
        return (
            <View>
                <WordsPage  {...this.props}/>
            </View>
        )
    }
}
//过滤state
const mapStateToProps = (state) => {
    const { words } = state;

    return {
        words
    };
};

//过滤action
const mapDispatchToProps = (dispatch) => {
    const wordsDispatch = bindActionCreators(wrodsCreators, dispatch);
    return {
        wordsDispatch
    }
};

 
export default connect(mapStateToProps, mapDispatchToProps)(WordsContainer);