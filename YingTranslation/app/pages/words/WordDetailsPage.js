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
    
    componentDidMount() {
        // console.log(this.props.navigation);
        
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
        console.log(id);
        const navigate = this.props.navigation.navigate;
        //http://fanyi.baidu.com/translate?aldtype=16047&query=lemon%0D%0A&keyfrom=baidu&smartresult=dict&lang=en2zh#en/zh/lemon
        switch (id) {
            case 'baidu':
                navigate('WebView', { title: '百度翻译', url:"http://fanyi.baidu.com/translate?aldtype=16047&query=lemon%0D%0A&keyfrom=baidu&smartresult=dict&lang=en2zh#en/zh/lemon"});
                break;
            case 'youdao':
                navigate('WebView', { title: '有道翻译', url: "http://www.youdao.com/w/fr/lemon/#keyfrom=dict2.top"})
                break;

            case 'goole':

                break;
            default:
                break;
        }
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
