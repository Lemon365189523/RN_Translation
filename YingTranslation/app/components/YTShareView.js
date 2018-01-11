import { 
    Animated,
    View,
    StyleSheet,
    Modal,
    Animated
 } from "react-native";
import React ,{Component} from'react';
import SharePlatform from '../librarys/share/SharePlatform';
import UShare from '../librarys/share/share'
import { deviceHeight } from "../constants/ScreenUtil";

const viewHeight = 200;
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
            >
                <Animated.View
                    style={[styles.bottomView,{bottom:this.state.bottom}]}
                >

                </Animated.View>
            </Modal>
        )
    }


    _onShare(){

        /** 
        * 参数说明： 
        * 1. 标题 
        * 2. 内容 
        * 3. 跳转链接 
        * 4. 图片链接 
        * 5. 分享平台 
        * 6. 分享结果回调 
        */
        UShare.share('标题', '内容', 'http://baidu.com', 'http://dev.umeng.com/images/tab2_1.png', SharePlatform.QQ, (message) => {
            // message:分享成功、分享失败、取消分享
            // ToastAndroid.show(message,ToastAndroid.SHORT);  
            console.log(message);
        });  
    }

    show(){
        this.setState({
            showModal:true,
        },()=>{
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: 200
            }).start();
        });
        
    }

 }

 const styles = StyleSheet.create({
    bottomView:{
        
    }
 })