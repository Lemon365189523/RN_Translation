import React from 'react';
import { 
    View,
    Text
 } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../pages/main/Main'
//链接reducer
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as translateCreators from '../actions/translate';

class MainContainer extends React.Component {
    static navigationOptions = {
        title: '翻译',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" size={25} color={tintColor} />
        )
    };

    render(){
        return(
            <View>
                <MainPage {...this.props}/>
            </View>
        )
    }
}

//过滤state
const mapStateToProps = (state) => {
    console.log(state);
    const { main } = state;
    
    return {
        main
    };
};

//过滤action
const mapDispatchToProps = (dispatch) => {
    const translateAction = bindActionCreators(translateCreators, dispatch);
    return {
        translateAction
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
