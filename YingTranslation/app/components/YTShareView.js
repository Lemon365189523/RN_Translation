import { 
    Animated,
    View,
    StyleSheet
 } from "react-native";
 import React ,{Component} from'react';
import SharePlatform from '../librarys/share/SharePlatform';
import UShare from '../librarys/share/share'


export default class YTShareView extends Component{

    
    onShare(){

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

     render(){
         return(
             <View>

             </View>
         )
     }
 }

 const styles = StyleSheet.create({

 })