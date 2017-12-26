import React, { Component } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';  
import Camera from 'react-native-camera';
import {THEME_BG_COLOR} from '../../constants/Colors';
import {deviceWidth} from '../../constants/ScreenUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';

var options = {
    includeBase64: true,
    compressImageQuality: 0.5, //压缩图片的质量 0~1
    compressVideoPreset: "",
    cropping: false //是否打开裁剪
}

export default class OCRPage extends Component {
    
    constructor(props){
        super(props);
        
    }

    componentDidMount() {

    }

    _onClickGoBack(){
        const navigation = this.props.navigation;
        navigation.goBack();
    }


    _openPicker(){
        ImagePicker.openPicker(
            options
        ).then(image => {
            console.log(image);
        }).catch(e => {
            console.log(e);
        });
    }


    //拍摄照片
    _takePicture() {
        this.camera.capture({ jpegQuality: 50 })
            .then(function (data) {
                console.log("拍照成功！图片保存地"  );
                console.log(data)
            })
            .catch(err => console.error(err));
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor={'rgba(0,0,0,0)'}
                    translucent={true}
                />
                
                <View style={styles.headerView}>
                    <TouchableOpacity 
                        style={styles.closeBtn}
                        activeOpacity={0.8}
                        onPress={this._onClickGoBack.bind(this)}
                    >
                        <Ionicons name={"md-close"} size={35} color={'#ffff'}/>
                    </TouchableOpacity>
                </View>

                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    type={Camera.constants.Type.back} //选择后置摄像头
                    aspect={Camera.constants.Aspect.fill}
                    captureQuality="medium"
                    captureTarget={Camera.constants.CaptureTarget.memory}//转成base64
                >
                    
                    
                </Camera>
                <View style={styles.bottomView}>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.photoBtn}
                        onPress={this._openPicker}
                    >
                        <Ionicons name={'md-photos'} size={40} color={'#ffff'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={this._takePicture.bind(this)}
                    >
                        <Ionicons name={'ios-radio-button-on-outline'} size={80} color={'#ffff'} />
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    headerView:{
        height: 80,
        backgroundColor: THEME_BG_COLOR
    },
    bottomView:{
        height: 100,
        backgroundColor: THEME_BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    photoBtn: {
        position: 'absolute',
        top: 30,
        left: 30
    },
    closeBtn:{
        position: 'absolute',
        bottom: 10,
        left: 15
    }
})