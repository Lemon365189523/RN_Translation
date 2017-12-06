import React,{Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Text
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

    _renderQueryView(){
        const { main } = this.props;
        if (main.data.query === undefined) return null;

        return (
            <View style={styles.queryView}>
                <Text style={styles.queryViewText}> 
                    {main.data.query} 
                </Text>
            </View>
        );
    };

    _renderBasicView(){
        const {main} = this.props;
        if (main.data.basic === undefined ) return null;
        const basic = main.data.basic;
        const {explains }= basic;
        const ukPhonetic = basic["uk-phonetic"];
        const usPhonetic = basic["us-phonetic"];
        if (!explains) return null;
        return (
            <View style={styles.basicView}>
                <View style={styles.basicViewPhonetic}>
                    <Text>美 [{usPhonetic}]</Text>
                    <Text style={{marginLeft: 20}}>英 [{ukPhonetic}]</Text>
                </View>
                {explains.map((item,key) => {
                    return (
                        <Text key={key}>{item}</Text>
                    )
                })}
            </View>
        ) 
    }

    //网络释意
    _renderWebView(){
        const {main} = this.props;
        const web = main.data.web;
        if (web === undefined) return null;
        if (web.length <= 0) return null;
        return(
            <View style={styles.webView}>
                <Text>网络释意</Text>
                {web.map((item,key)=>{
                    return (
                        <View key={key}>

                        </View>
                    )
                })}
            </View>
        )
    }

    render(){
      
        return (
            <View>
                <TextInput 
                    style={[styles.textInput, styles.margins]}
                    multiline={true}
                    onChangeText={(text)=>this._textOnChange(text)}
                /> 
                <YTButton 
                    title="翻译"
                    style={[styles.translateBtn, styles.margins]}
                    onPress={this._onClick.bind(this)}
                    color='red'
                    textColor = '#ffff'
                />
                <ScrollView 
                    style = {[styles.margins, styles.scrollView]}
                >
                    {this._renderQueryView()}
                    {this._renderBasicView()}
                    {this._renderWebView()}
                </ScrollView>
            </View>
        )
    }

}

export default MainPage;

const styles = StyleSheet.create({
    margins :{
        marginRight: 20,
        marginLeft: 20,
    },
    textInput : {
        marginTop: 20,
        height: 100,
        backgroundColor: '#ffffff'
    },
    translateBtn: {
        height: 44,
        marginTop: 20,
        backgroundColor: 'red'
    },
    scrollView:{
        marginTop: 20,
    },
    queryView:{
        backgroundColor: '#ffff',
        padding: 10
    },
    queryViewText:{
        fontFamily: 'Cochin',
        fontSize: 30,
    },
    basicView: {
        backgroundColor : '#ffff',
        marginTop: 10,
        padding:10
    },
    basicViewPhonetic: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 10
    },
    webView:{
        backgroundColor: '#ffff',
        marginTop: 10,
        padding: 10
    },

})