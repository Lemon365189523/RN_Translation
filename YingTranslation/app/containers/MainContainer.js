import React from 'react';
import { 
    View,
    Text,
    StatusBar
 } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../pages/main/Main'
//链接reducer
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as translateCreators from '../actions/translate';
import * as wrodsHandleCreators from '../actions/wordsHandle';
import SplashScreen from 'react-native-splash-screen';
import { THEME_BG_COLOR } from '../constants/Colors';

class MainContainer extends React.Component {
    static navigationOptions = {
        title: '翻译',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" size={25} color={tintColor} />
        )
    };

    componentDidMount(){
        SplashScreen.hide();
    }

    render(){
        return(
            <View>
                <StatusBar
                    backgroundColor={THEME_BG_COLOR}
                    barStyle="light-content"
                />
                <MainPage {...this.props}/>
            </View>
        )
    }
}

//过滤state
const mapStateToProps = (state) => {
    const { main , words } = state;
    
    return {
        main,
        words
    };
};

//过滤action
const mapDispatchToProps = (dispatch) => {
    const mainDispatch = bindActionCreators(translateCreators, dispatch);
    const wordsHandleDispatch = bindActionCreators(wrodsHandleCreators, dispatch);
    return {
        mainDispatch,
        wordsHandleDispatch
    };
};

//连接reducer和action
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
