import { 
    Animated,
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Text,
    Image
 } from "react-native";
import React ,{Component} from'react';
import SharePlatform from '../librarys/share/SharePlatform';
import UShare from '../librarys/share/share'
import { deviceHeight ,scaleSize,deviceWidth} from "../constants/ScreenUtil";
import images from '../img';
import {THEME_BG_COLOR} from '../constants/Colors'

const viewHeight = deviceWidth/3*2;

const shareArr = [
    {
        title: '微信',
        type: SharePlatform.WECHAT,
        image: images.weixin
    },
    {
        title: '微信朋友圈',
        type: SharePlatform.WECHATMOMENT,
        image: images.wechatMonent
    },
    {
        title: '微博',
        type: SharePlatform.SINA,
        image: images.sina
    },
    {
        title: 'QQ',
        type: SharePlatform.QQ,
        image: images.qq
    },
    {
        title: 'QQ空间',
        type: SharePlatform.QQZONE,
        image: images.qqzone
    },

]

export default class YTShareView extends Component{

    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            bottom: new Animated.Value(-viewHeight)
        }
    }



    render() {
        return (
            <Modal
                visible={this.state.showModal}
                onRequestClose={()=>{}}
                transparent={true}

            >   
                <TouchableOpacity 
                    style={{flex:1,backgroundColor:'rgba(0,0,0,0.4)'}}
                    activeOpacity={1}
                    onPress={this._hide.bind(this)}
                >
                    <Animated.View
                        style={[styles.bottomView,{bottom:this.state.bottom}]}
                    >
                        {this._renderShareItems()}
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        )
    }


    _onShare(stype){

        /** 
        * 参数说明： 
        * 1. 标题 
        * 2. 内容 
        * 3. 跳转链接 
        * 4. 图片链接 
        * 5. 分享平台 
        * 6. 分享结果回调 
        */
        UShare.share('标题', '内容', 'http://baidu.com', 'http://dev.umeng.com/images/tab2_1.png', stype, (message) => {
            // message:分享成功、分享失败、取消分享
            // ToastAndroid.show(message,ToastAndroid.SHORT);  
            console.log(message);
        });  
    }

    _hide(){
        Animated.timing(this.state.bottom, {
            toValue: -viewHeight,
            duration: 200
        }).start(()=>{
            this.setState({
                showModal: false,
            })
        });
        
    }

    show(){
        this.setState({
            showModal:true,
        },()=>{
            Animated.timing(this.state.bottom, {
                toValue: 0,
                duration: 200
            }).start();
        });
        
    }

    _renderShareButton(item,key){

        return(
            <TouchableOpacity
                style={styles.shareButton}
                key={key}
                onPress={()=>{
                    this._onShare(item.type)
                }}
            >
                <Image 
                    source={item.image}
                    style={{height:60,width:60}}
                />
                <Text
                    style={{ color: THEME_BG_COLOR,marginTop:10,fontSize:12}}
                    
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        )
    }

    _renderShareItems(){
        const row = Math.ceil(shareArr.length / 3);
        const rowViews = [];
        for (var i = 0; i < row; i++){
            const items = [];
            for(var j=0; j < 3; j++){
                if ((i * 3 + j)<shareArr.length){
                    var item = shareArr[i * 3 + j];
                    items.push(this._renderShareButton(item, i * 3 + j));
                }
            }
            rowViews.push(
                <View style={{flex:1,flexDirection:'row'}} key={'row'+i}>
                    {items}
                </View>
            )
        }

        return(
            <View style={{flex:1}}>
                {rowViews}
            </View>
        )
    }

 }

 const styles = StyleSheet.create({
    bottomView:{
        backgroundColor: '#ffff',
        position: 'absolute',
        left:0,
        right:0,
        height:viewHeight
    },
    shareButton:{
        justifyContent:'center',
        alignItems: 'center',
        margin: scaleSize(40),
        height: deviceWidth / 3 - scaleSize(80),
        width: deviceWidth / 3 - scaleSize(80)
    }
 })