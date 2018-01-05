import React from 'react';
import {
    View,
    Text,
    ART,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { THEME_BG_COLOR  } from "../../constants/Colors";
import {deviceHeight,deviceWidth} from '../../constants/ScreenUtil';
import Imgs from '../../img';
import YTSpringView from '../../components/YTSpringView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YTShareView from '../../components/YTShareView';
const { Surface, Shape, Path, Group} = ART;


const art_height = 90;
const radius = 300;

const btnArr = [
    {
        id: 'baidu',
        img: Imgs.baiduIcon
    },
    {
        id: 'youdao',
        img: Imgs.youdaoIcon
    },
    {
        id: 'google',
        img: Imgs.googlIecon
    }
];

export default class WordDetailsPage extends React.Component{
    
    static navigationOptions = ({ navigation, screenProps }) => ({
        // 
        headerRight: (
            <TouchableOpacity 
                onPress={()=>{
                    navigation.state.params.onClickShareBtn()
                }}
                style={{paddingRight:10}}
            >
                <Ionicons name={"ios-share-outline"} size={35} color={'#ffff'} />
            </TouchableOpacity>
        )
    })


    componentWillMount(){
        this.props.navigation.setParams({
            onClickShareBtn:()=>{

                console.log(this.shareView);
            }
        })
    }

    _renderHeader(title){

        return(
            <View style={styles.headView}>
                <View style={styles.lineView}></View>
                <Text>{title}</Text>
            </View>
        )
    }

    _renderBasicView(info){
        const basic = info.basic;
        return(
            <View style={[styles.oneView, styles.viewMargin]}>
                <Image source={Imgs.lian} style={[styles.topLeftImg, styles.imageSize]} resizeMode={"stretch"} />
                <Image source={Imgs.lian} style={[styles.topRightImg, styles.imageSize]} resizeMode={"stretch"} />
                {this._renderHeader("翻译")}
                <View style={styles.basicView}>
                    <Text style={{backgroundColor:THEME_BG_COLOR,color:'#fff',padding:10,fontSize:17}} >{info.translation[0]} </Text>
                    {this._renderBasicContenView(basic)}

                </View>
            </View>
        )
    }

    _renderBasicContenView(basic) {
        if (basic === undefined) {
            return null;
        }
        console.log(basic);
        const { explains } = basic;
        const ukPhonetic = basic["uk-phonetic"];
        const usPhonetic = basic["us-phonetic"];
        return (
            <View style={styles.basicContentView}>
                <View style={{flexDirection:'row'}}>
                    <Text>美 [{usPhonetic}]</Text>
                    <Text style={{ marginLeft: 20 }}>英 [{ukPhonetic}]</Text>
                </View>
                {explains.map((item, key) => {
                    return (
                        <Text key={key}>{item}</Text>
                    )
                })}
            </View>
        )
    }

    _renderWebView(info){
        const web = info.web;
        if (web === undefined) return null;
        if (web.length <= 0) return null;
        return(
            <View style={[styles.twoView, styles.viewMargin]}>
                <Image source={Imgs.lian} style={[styles.topLeftImg, styles.imageSize]} resizeMode={"stretch"} />
                <Image source={Imgs.lian} style={[styles.topRightImg, styles.imageSize]} resizeMode={"stretch"} />
                {this._renderHeader("网络释意")}
                <View style={styles.webView}>
                    
                    {web.map((item, key) => {
                        return (
                            <YTSpringView
                                title={item.key}
                                key={key}
                                subTitles={item.value}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    _renderBtnView(){
        return(
            <View style={[styles.threeView, styles.viewMargin]}>
                <Image source={Imgs.lian} style={[styles.topLeftImg, styles.imageSize]} resizeMode={"stretch"} />
                <Image source={Imgs.lian} style={[styles.topRightImg, styles.imageSize]} resizeMode={"stretch"} />
                {this._renderHeader("在线翻译")}
                <View style={styles.btnView}>
                    {
                        btnArr.map((item, key)=>{
                            return (
                                <TouchableOpacity 
                                    key={key} 
                                    onPress={()=>this._onClickOnLineBtn(item.id)}
                                >
                                    <Image source={item.img} resizeMode={"stretch"} style={{height:40,width:40}}/>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>

        )
    }

    _onClickOnLineBtn(id){
        const navigate = this.props.navigation.navigate;
        const { info } = this.props.navigation.state.params;
        console.log(info);
        var strs = info.l.split("2");
        var fromL = strs[0];
        var toL = strs[1];
        var q = info.query;

        switch (id) {
            case 'baidu':
                
                navigate('WebView', { title: '百度翻译', url: this._changeBaiduUrl(fromL, toL, q)});
                break;
            case 'youdao':
                navigate('WebView', { title: '有道翻译', url: this._changeYouDaoUrl(fromL,toL, q)});
                break;

            case 'google':
                navigate('WebView', { title: '谷歌翻译', url: this._changeGoogleUrl(fromL, toL, q)})
                break;
            default:
                break;
        }
    }

    _changeBaiduUrl(fromL, toL ,query){
        //http://fanyi.baidu.com/translate?aldtype=16047&query=lemon%0D%0A&keyfrom=baidu&smartresult=dict&lang=en2zh#en/zh/lemon
        //http://fanyi.baidu.com/translate?aldtype=16047&query=hello%0D%0A&keyfrom=baidu&smartresult=dict&lang=auto2zh#en/jp/hello
        var changeF = function changeStr(params) {
            switch (params) {
                case "EN":
                    return "en"
                    break;
                case "ja":
                    return "jp";
                    break;
                case "ko":
                    return "kor";
                    break;
                case "fr":
                    return "fra";
                    break;
                case "es":
                    return "spa";
                    break;
                default:
                    return params;
                    break;
            }
        }

        var f = changeF(fromL);
        var t = changeF(toL);
        return "https://fanyi.baidu.com/translate?aldtype=16047&query=" + query + "%0D%0A&keyfrom=baidu&smartresult=dict&lang=auto2zh#" + f + "/" + t + "/" + query;
    }

    _changeYouDaoUrl(fromL, toL, query){
        //https://m.youdao.com/dict?le=jap&q=lemon
        var changeF = function changeStr(params) {
            switch (params) {
                case "EN":
                    return "eng";
                case "ja":
                    return "jap";
                    break;
                    break;
                default:
                    break;
            }
        }
        var t = changeF(toL);
        return "https://m.youdao.com/dict?le=" + t + "&q=" + query;
    }

    _changeGoogleUrl(fromL, toL, query){
        //https://translate.google.cn/#en/zh-CN/lemon  ja  fr ko es pt ru
        
        return "https://translate.google.cn/#"+fromL+"/"+toL+"/" + query;
    }

    render(){
        const rectangle = new Path()
            .moveTo(0, 0)
            .lineTo(deviceWidth, 0)
            .lineTo(deviceWidth, art_height)
            .lineTo(0, art_height)
            .close();
        
        const curve = new Path()
            .moveTo(0, art_height)
            .arc(deviceWidth, 0, radius)
            .close();

        const { info } = this.props.navigation.state.params;
    
        return (
            <View>
                <View style={styles.headerBGView}>
                    <Surface width={deviceWidth} height={100}>
                        <Group >
                            <Shape d={rectangle} fill={THEME_BG_COLOR} />
                            <Shape d={curve} fill="rgb(232,232,239)" />
                        </Group>
                    </Surface>
                </View>
                <ScrollView style={styles.scrollView} bounces={false}>

                    { this._renderBasicView(info)}

                    {this._renderWebView(info)}

                    {this._renderBtnView()}
           
                </ScrollView>
                <YTShareView 
                    ref={shareView => {this.shareView=shareView} }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    headerBGView:{
        position: 'absolute'
    },
    oneView:{
        backgroundColor: '#ffff',
        marginTop: 50
    },
    viewMargin:{
        marginLeft: 20,
        marginRight: 20
    },
    scrollView:{
        height: deviceHeight -70
    },
    topLeftImg:{
        position: 'absolute',
        top: -20,
        left: 10
    },
    topRightImg:{
        position: 'absolute',
        top: -20,
        right: 10
    },
    imageSize:{
        height: 30,
        width:10
    },
    twoView:{
        backgroundColor: '#ffff',
        marginTop: 10
    },
    threeView:{
        backgroundColor: '#ffff',
        marginTop: 10
    },
    lineView:{
         height:10,
         width: 3,
         backgroundColor: THEME_BG_COLOR,
         marginLeft: 10,
         marginRight: 4,
         borderRadius: 1.5
    },
    headView:{
        marginTop: 13,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    basicContentView:{
      paddingTop: 5,
    },
    basicView:{
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30
    },
    webView:{
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 10
    },
    btnView:{
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
