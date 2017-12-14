import React,{Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import {THEME_LIGHT_BG_COLOR, THEME_BG_COLOR} from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import YTButton from '../../components/YTButton';
import ImgSource from '../../img';
import YTLoadingView from '../../components/YTLoadingView';
import YTDropdown from '../../components/YTDropdown';

const SELECT_TO = 99;
const SELECT_FROM = 100;

class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            text: '',
            to : '中文',
            from : '英文'
        }
        this.drowdown;
        this.currentSelect = 0;
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

    _textInputOnSubmitEditing(e){
        const { mainDispatch } = this.props;
        mainDispatch.translate(this.state.text);
    }

    _onCilckMarkBtn(data){
        const { wordsHandleDispatch } = this.props;
        wordsHandleDispatch.collectionWord(data.query, data);
    }

    _onCliclToBtn(){
        this.currentSelect = SELECT_TO;
        this.drowdown.show();
    }

    _onClickFromBtn(){
        this.currentSelect = SELECT_FROM;
        this.drowdown.show();
    }

    _changleLange(index){
        switch (this.currentSelect) {
            case SELECT_TO:
                this.setState({to:data[index]})
                break;
            case SELECT_FROM:
                this.setState({ from: data[index] })
                break;
            default:
                break;
        }
    }

/**
 * ================== render ========================================================
 */
    _renderLanguageView(){

        return (
            <View style={styles.languageView} >
                <TouchableOpacity 
                    style={styles.languageButton} 
                    onPress={this._onCliclToBtn.bind(this)} 
                >
                    <Text style={{color:'#ffff'}}>{this.state.to}</Text>
                    <Icon name={"md-arrow-dropdown"} size={10} color={"#ffff"}/>
                </TouchableOpacity>
                <Image source={ImgSource.translation} style={styles.changleLogo} resizeMode="cover"/>
                <TouchableOpacity 
                    style={styles.languageButton} 
                    onPress={this._onClickFromBtn.bind(this)}
                > 
                    <Text style={{ color: '#ffff' }}>{this.state.from}</Text>
                    <Icon name={"md-arrow-dropdown"} size={10} color={"#ffff"} />
                </TouchableOpacity>
            </View>
        )
    }

    _renderQueryView(){
        const { main } = this.props;
        if (main.data.query === undefined) return null;
        const iconName = main.data.mark ? "ios-bookmark" : "ios-bookmark-outline" ;
        return (
            <View style={styles.queryView}>
                <Text style={styles.queryViewText}> 
                    {main.data.query} 
                </Text>
                <TouchableOpacity onPress={()=>this._onCilckMarkBtn(main.data)}>
                     <Icon name={iconName} size={25} color={THEME_BG_COLOR} />
                </TouchableOpacity>
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
                {this._renderLanguageView()}
                <TextInput 
                    style={[styles.textInput, styles.margins]}
                    multiline={true}
                    onChangeText={(text)=>this._textOnChange(text)}
                    underlineColorAndroid="transparent"
                    blurOnSubmit={true}
                    onSubmitEditing={this._textInputOnSubmitEditing.bind(this)}
                /> 
                <YTButton 
                    title="翻译"
                    style={[styles.translateBtn, styles.margins]}
                    onPress={this._onClick.bind(this)}
                    textColor = '#ffff'
                />
                <ScrollView 
                    style = {[styles.margins, styles.scrollView]}
                >
                    {this._renderQueryView()}
                    {this._renderBasicView()}
                    {this._renderWebView()}
                </ScrollView>
                <YTLoadingView visible={false}/>
                <YTDropdown 
                    ref={(drowdown)=>{this.drowdown = drowdown}}
                    data={data}
                    selectIndex={this._changleLange.bind(this)}
                />
            </View>
        )
    }

}

export default MainPage;

const data = [
    "中文",
    "英文",
    "日语",
    "韩文",
    "法文",
    "俄文",
    "葡萄牙文",
    "西班牙文"
]

const styles = StyleSheet.create({
    margins :{
        marginRight: 20,
        marginLeft: 20,
    },
    textInput : {
        marginTop: 10,
        height: 100,
        backgroundColor: '#ffffff',
        textAlignVertical: 'top'
    },
    translateBtn: {
        height: 44,
        marginTop: 20,
        backgroundColor: THEME_LIGHT_BG_COLOR
    },
    scrollView:{
        marginTop: 20,
    },
    queryView:{
        backgroundColor: '#ffff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around'
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
    languageView:{
        flexDirection: 'row',
        backgroundColor: THEME_BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30
    },
    changleLogo:{
        width: 20,
        height: 20
    },
    languageButton:{
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})