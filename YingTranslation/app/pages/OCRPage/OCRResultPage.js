import React, { Component } from "react";
import {  
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    StatusBar,
    Text,
    Picker,
    ActivityIndicator
} from "react-native";
import {THEME_BG_COLOR} from '../../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSize,onePixel,deviceWidth} from '../../constants/ScreenUtil';
import ImageViewer from 'react-native-image-zoom-viewer';
import Images from '../../img'
import ocrReducer from "../../reducers/ocrReducer";

export default class OCRResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            showPicker: false,
            toStr: '英文',
        }
        this.toStr = '英文';
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params);
    }

    componentWillMount(){
        
    }

    _onClickGoBack(){
        const navigation = this.props.navigation;
        navigation.goBack();
    }

    _onClickShareBtn(){

    }
    

    _onClickChangeBtn(){
        this.setState({
            showPicker: true
        })
    }

    _onChangeToString(value){

        this.setState({
            toStr: value
        })
    }

    _onClickDoneBtn(){
        this.toStr = this.state.toStr;
        this.setState({
            showPicker: false
        });
        //翻译
        const { ocrResult, resultDispatch} = this.props;
        const toIndex = data.indexOf(this.toStr);
        const codings = ["zh-CHS", "ja", "EN", "ko", "fr", "ru", "pt", "es"];
        const resultData = this.props.navigation.state.params.resultData
        resultDispatch.translate(resultData,codings[toIndex]);
    }
    
    _renderItenm(data){
        const {ocrResult} = this.props;
        return(
            <View style={styles.itemView}>
                <Text style={styles.text}> {data.item.words}</Text>
                <View style={styles.line}/>
                
                {
                    ocrResult.activity ? 
                    <ActivityIndicator color={'#ffff'} size="small" /> 
                        : 
                    <Text style={styles.text}> {data.item.translation}</Text>
                }
            </View>
        )
    }

    _keyExtractors(item, key) {
        return key;
    }

    _onClickImage(){
        this.setState({
            visible: true
        })
    }

    render(){
        console.log('render');
        const { imageData} = this.props.navigation.state.params;
        const {ocrResult} = this.props;
        var resultData = ocrReducer.resultData;
        if (!resultData) {
            resultData = this.props.navigation.state.params.resultData;
        }
        return(
            <View style={styles.container}>

                <View style={styles.headerView}>
                    <Modal 
                        visible={this.state.visible} 
                        transparent={true}
                        onRequestClose={()=>{}}
                    >   
                        <StatusBar 
                            backgroundColor={'black'}
                        />
                        <ImageViewer 
                            imageUrls={[{ url: "data:image/png;base64," + imageData }]} 
                            onClick={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                        />
                    </Modal>
                    
                    <TouchableOpacity
                        onPress={this._onClickImage.bind(this)}
                        style={{ flex: 2 }}
                        activeOpacity={1}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: "data:image/png;base64," + imageData }}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        activeOpacity={0.8}
                        onPress={this._onClickGoBack.bind(this)}
                    >
                        <Ionicons name={"md-close"} size={35} color={'#ffff'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.shareBtn}
                        activeOpacity={0.8}
                        onPress={this._onClickShareBtn.bind(this)}
                    >
                        <Ionicons name={"ios-share-outline"} size={35} color={'#ffff'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.changeBtn}
                        activeOpacity={0.8}
                        onPress={this._onClickChangeBtn.bind(this)}
                    >
                        <Image source={Images.change}/>
                        <Text style={{ color: '#ffff'}}>{this.toStr}</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={resultData.lines}
                    renderItem={this._renderItenm.bind(this)}
                    keyExtractor={this._keyExtractors.bind(this)}
                    style={{marginTop:5}}
                />
                <Modal 
                    visible={this.state.showPicker}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <TouchableOpacity
                        style={styles.changeModalView}
                        onPress={()=>{this.setState({showPicker: false,toStr:this.toStr})}}
                        activeOpacity={1}
                    >
                        <View style={styles.picker}>
                            <TouchableOpacity
                                style={styles.doneBtn}
                                onPress={this._onClickDoneBtn.bind(this)}
                            >
                                <Text style={{color:'#ffff',fontSize:20}}>确定</Text>
                            </TouchableOpacity>
                            <Picker

                                selectedValue={this.state.toStr}
                                onValueChange={this._onChangeToString.bind(this)}
                            >
                                {
                                    data.map((item, key) => {
                                        return (
                                            <Picker.Item label={item} value={item} color={'#ffff'} key={key} />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                    </TouchableOpacity>
                </Modal>
 
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    image: {
        flex: 1,
        backgroundColor: 'black'

    },
    headerView:{
        height: scaleSize(400),
        backgroundColor: THEME_BG_COLOR,
    },
    closeBtn: {
        position: 'absolute',
        left: 15,
        top: 25,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    itemView:{
        // height: 100,
        margin: 5,
        padding: 10,
        backgroundColor: THEME_BG_COLOR
    },
    text:{
        color: 'white'
    },
    line:{
        height: onePixel,
        backgroundColor: '#ffff',
        marginTop: 5,
        marginBottom: 5
    },
    shareBtn:{
        position: 'absolute',
        right: 15,
        top: 25,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    changeBtn:{
        position: 'absolute',
        top: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        left: deviceWidth/2 - scaleSize(80),
        flexDirection: 'row'
    },
    picker:{
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor: THEME_BG_COLOR
    },
    changeModalView:{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    doneBtn:{
        padding:10,
        flex: 1
    }
});

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