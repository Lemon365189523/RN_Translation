import React,{Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert,
    DeviceEventEmitter
} from 'react-native';
import {THEME_LIGHT_BG_COLOR, THEME_BG_COLOR} from '../../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import YTButton from '../../components/YTButton';
import ImgSource from '../../img';
import YTLoadingView from '../../components/YTLoadingView';
import YTDropdown from '../../components/YTDropdown';
import YTSpringView from '../../components/YTSpringView';
import {scaleSize, deviceHeight} from '../../constants/ScreenUtil';
import YTToast from '../../components/YTToast';

const SELECT_TO = 99;
const SELECT_FROM = 100;

class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            text: '',
            to : '中文',
            from : '英文',
            setNeedRefresh : 0,
            inputOnFocus: false
        }
        this.drowdown;
        this.currentSelect = 0;
    }

    componentDidMount(){
       
        this.subscription = DeviceEventEmitter.addListener('RemoveWord', (word) => {
            const { mainDispatch, main } = this.props;
            if (main.data.query === word.query) {
                console.log('mainPage remove word');
                mainDispatch.removeMark(main.data);
            }
        });

        this.subscription2 = DeviceEventEmitter.addListener('MainPageShowToast',(errMsg)=>{
            this.toast.show(errMsg);
        })
    }

    componentWillUnmount(){
        this.subscription.remove();
        this.subscription2.remove();
    }

    _onTranslate(){
        if (this.state.text.match(/^[ ]*$/)){
            this.toast.show("请输入单词",2000);
        }else{
            const { mainDispatch } = this.props;
            const fromIndex = data.indexOf(this.state.from);
            const toIndex = data.indexOf(this.state.to);
            const codings = ["zh-CHS", "ja", "EN", "ko", "fr", "ru", "pt", "es"]
            const fromCoding = codings[fromIndex];
            const toCoding = codings[toIndex];
            mainDispatch.translate(this.state.text, toCoding, fromCoding);

        }
        this.setState({
            inputOnFocus: false
        })
        Keyboard.dismiss();
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
        const {mainDispatch} = this.props;
        if (data.mark) {
            Alert.alert(
                "是否取消收藏",
                null,
                [
                    {text:'取消'},
                    { text: '确认' , 
                        onPress:() => { 
                            mainDispatch.removeWord(data)
                        }
                    }
                ]
            )
        }else{
            mainDispatch.markWord(data);
        }
        
    }

    _onCliclToBtn(){
        
        if (!this.drowdown.isShow){    
            this.drowdown.show();
        } else if (this.currentSelect == SELECT_TO && this.drowdown.isShow){
            this.drowdown.hide();
        }
        this.currentSelect = SELECT_TO;
        this.setState({setNeedRefresh: this.state.setNeedRefresh++})
    }

    _onClickFromBtn(){
        
        if (!this.drowdown.isShow) {
            this.drowdown.show();
        } else if (this.currentSelect == SELECT_FROM && this.drowdown.isShow){
            this.drowdown.hide();
        }
        this.currentSelect = SELECT_FROM;
        this.setState({ setNeedRefresh: this.state.setNeedRefresh++ })
    }

    _changleLange(index){
        if (index == 99) {
            this.setState({ setNeedRefresh: this.state.setNeedRefresh++ })
            return;
        }
        switch (this.currentSelect) {
            case SELECT_TO:
                if (data[index] == this.state.from ){
                    this.setState((state)=>{
                        return {
                            to: state.from,
                            from: state.to
                        }
                    })
                }else{
                    this.setState({ to: data[index] })
                }
               
                break;
            case SELECT_FROM:
                if (data[index] == this.state.to){
                    this.setState((state) => {
                        return {
                            to: state.from,
                            from: state.to
                        }
                    })
                }else{
                    this.setState({ from: data[index] })
                }
                
                break;
            default:
                break;
        }
    }


/**
 * ================== render ========================================================
 */
    _renderLanguageView(){
        //上md-arrow-dropup 下md-arrow-dropdown
        return (
            <View style={styles.languageView} >
                <TouchableOpacity 
                    style={styles.languageButton} 
                    onPress={this._onClickFromBtn.bind(this)} 
                >
                    <Text style={{color:'#ffff'}}>{this.state.from}</Text>
                    <Icon 
                        name={(this.currentSelect == SELECT_FROM && this.drowdown.isShow) ? "md-arrow-dropup" :"md-arrow-dropdown"} 
                        size={15} 
                        color={"#ffff"}
                    />
                </TouchableOpacity>
                <Image source={ImgSource.translation} style={styles.changleLogo} resizeMode="cover"/>
                <TouchableOpacity 
                    style={styles.languageButton} 
                    onPress={this._onCliclToBtn.bind(this)}
                > 
                    <Text style={{ color: '#ffff' }}>{this.state.to}</Text>
                    <Icon 
                        name={(this.currentSelect == SELECT_TO && this.drowdown.isShow) ? "md-arrow-dropup" : "md-arrow-dropdown"} 
                        size={15} 
                        color={"#ffff"} 
                    />
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
                    {main.data.translation[0]} 
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
                <Text style={{marginBottom:5}}>网络释意</Text>
                {web.map((item,key)=>{
                    return (
                        <YTSpringView
                            title={item.key}
                            key={key}
                            subTitles={item.value}
                        />
                    )
                })}
            </View>
        )
    }

    render(){

        return (
            <View >
                {this._renderLanguageView()}
                <TextInput 
                    style={[styles.textInput, styles.margins]}
                    multiline={true}
                    onChangeText={(text)=>this._textOnChange(text)}
                    underlineColorAndroid="transparent"
                    blurOnSubmit={true}
                    onSubmitEditing={this._onTranslate.bind(this)}
                    blurOnSubmit={true}
                /> 
                <YTButton 
                    title="翻译"
                    style={[styles.translateBtn, styles.margins]}
                    onPress={this._onTranslate.bind(this)}
                    textColor = '#ffff'
                />
                <ScrollView 
                    style = {[styles.margins, styles.scrollView]}
                    bounces={false}
                >
                    {this._renderQueryView()}
                    {this._renderBasicView()}
                    {this._renderWebView()}
                </ScrollView>
                
                <YTDropdown 
                    ref={(drowdown)=>{this.drowdown = drowdown}}
                    data={data}
                    selectIndex={this._changleLange.bind(this)}
                />
                <YTToast
                    ref={toast => this.toast = toast}
                />
            </View>
        )
    }

}
//<YTLoadingView visible={false}/>
export default MainPage;

const data = [
    "中文",
    "日语",
    "英文",
    "韩文",
    "法文",
    "俄文",
    "葡萄牙文",
    "西班牙文"
]

const styles = StyleSheet.create({
    margins :{
        marginRight: scaleSize(30),
        marginLeft: scaleSize(30),
    },
    textInput : {
        marginTop: scaleSize(30),
        height: scaleSize(200),
        backgroundColor: '#ffffff',
        textAlignVertical: 'top'
    },
    translateBtn: {
        height: scaleSize(80),
        marginTop: scaleSize(30),
        backgroundColor: THEME_BG_COLOR
    },
    scrollView:{
        marginTop: scaleSize(30),
        height: deviceHeight  - scaleSize(670),
    },
    queryView:{
        backgroundColor: '#ffff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
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
        height: scaleSize(60)
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