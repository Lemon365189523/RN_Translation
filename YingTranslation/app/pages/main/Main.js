import React,{Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import YTButton from '../../components/YTButton';

class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }

    _onClick(){
        const {mainDispatch} = this.props;
        mainDispatch.translate(this.state.text);
    }
    _textOnChange(text){
        this.setState({
            text: text
        })
    }
    render(){
        return (
            <View>
                <TextInput 
                    style={styles.textInput}
                    multiline={true}
                    onChangeText={(text)=>this._textOnChange(text)}
                /> 
                <YTButton 
                    title="翻译"
                    style={styles.translateBtn}
                    onPress={this._onClick.bind(this)}
                    color='red'
                    textColor = '#ffff'
                />
            </View>
        )
    }

}

export default MainPage;

const styles = StyleSheet.create({
    textInput : {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        height: 100,
        backgroundColor: '#ffffff'
    },
    translateBtn: {
        height: 44,
        marginTop: 40,
        marginLeft:20,
        marginRight:20,
        backgroundColor: 'red'
    }
})