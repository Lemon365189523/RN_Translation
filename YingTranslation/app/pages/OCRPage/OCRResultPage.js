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
import YTShareView from '../../components/YTShareView';
import YTToast from '../../components/YTToast';

var selected_from = 1;
var selected_to = 2;

export default class OCRResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible:false,
            showPicker: false,
            toStr: '英文',
            fromStr: '中文'
        }
        this.toStr = '英文';
        this.fromStr = '中文';
        this.selected ;
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params);
    }


    _onClickGoBack(){
        const navigation = this.props.navigation;
        navigation.goBack();
    }

    _onClickShareBtn(){
        this.shareView.show();
    }
    

    _onClickToBtn(){
        this.selected = selected_to;
        this.setState({
            showPicker: true
        })
    }

    _onChangeToString(value){
        if (this.selected == selected_to) {
            this.setState({
                toStr: value
            });
        }else if(this.selected == selected_from){
            this.setState({
                fromStr: value
            });
        }
 
    }

    _onClickFromBtn(){
        this.selected = selected_from;
        this.setState({
            showPicker: true
        });
    }

    _onClickDoneBtn(){
        const toCodings = ["zh-CHS", "ja", "EN", "ko", "fr", "ru", "pt", "es"];
        const fromCodings = ["zh-CHS", "EN"];

        if (this.selected == selected_to) {
            this.toStr = this.state.toStr;
            this.setState({
                showPicker: false
            });
            //翻译
            const { ocrResult, resultDispatch } = this.props;
            const resultData = this.props.navigation.state.params.resultData
            const fromCoding = fromCodings[fromData.indexOf(this.fromStr)];
            const toCoding = toCodings[toData.indexOf(this.toStr)];
            resultDispatch.translate(resultData,fromCoding ,toCoding);
        }else if(this.selected == selected_from){
            this.fromStr = this.state.fromStr;
            this.setState({
                showPicker: false
            });
            //翻译
            const { ocrResult, resultDispatch } = this.props;
            const resultData = this.props.navigation.state.params.resultData
            const fromCoding = fromCodings[fromData.indexOf(this.fromStr)];
            const toCoding = toCodings[toData.indexOf(this.toStr)];
            resultDispatch.translate(resultData, fromCoding, toCoding);
        }

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
        // console.log('render');
        const { imageData} = this.props.navigation.state.params;
        const {ocrResult} = this.props;
        var resultData = ocrReducer.resultData;
        if (!resultData) {
            resultData = this.props.navigation.state.params.resultData;
        }
        var data = [];
        var selectedValue = "";
        if (this.selected == selected_to) {
            data = toData;
            selectedValue = this.state.toStr;
        }else if(this.selected == selected_from){
            data = fromData;
            selectedValue = this.state.fromStr
        }
        return(
            <View style={styles.container}>
                {/* 显示图片全屏model */}
                <View style={styles.headerView}>
                    <Modal 
                        visible={this.state.visible} 
                        transparent={true}
                        onRequestClose={()=>{
                            this.setState({
                                visible:false
                            }) 
                        }}
                    >   
                        <StatusBar 
                            backgroundColor={'black'}
                        />
                        <ImageViewer 
                            imageUrls={[{ url: "data:image/png;base64," + imageData }]} 
                            onClick={(onCancel)=>{
                                console.log('点击了图片');
                                this.setState({
                                    visible:false
                                })
                            }}
                            saveToLocalByLongPress={false}
                            onShowModal={()=>{
                                console.log('onShowModal');
                            }}
                            maxOverflow={0}
                        />
                    </Modal>
                    {/* 顶部图片 */}
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
                    
                    <View
                        style={styles.changeBtn}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this._onClickFromBtn.bind(this)}
                        >
                            <Text style={styles.btnText}>{this.fromStr}</Text>
                        </TouchableOpacity>
                        <Image source={Images.change}/>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this._onClickToBtn.bind(this)}
                        >
                            <Text style={styles.btnText}>{this.toStr}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* 翻译list */}
                <FlatList
                    data={resultData.regions[0].lines}
                    renderItem={this._renderItenm.bind(this)}
                    keyExtractor={this._keyExtractors.bind(this)}
                    style={{marginTop:5}}
                />

                {/* picker */}
                <Modal 
                    visible={this.state.showPicker}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <TouchableOpacity
                        style={styles.changeModalView}
                        onPress={()=>{
                            if(this.selected == selected_to){
                                this.setState({ showPicker: false, toStr: this.toStr })
                            }else if(this.selected == selected_from){
                                this.setState({ showPicker: false, fromStr: this.fromStr })
                            }
                            
                        }}
                        activeOpacity={1}
                    >
                        <View style={styles.picker}>
                            <TouchableOpacity
                                style={styles.doneBtn}
                                onPress={this._onClickDoneBtn.bind(this)}
                            >
                                <Text style={{color:THEME_BG_COLOR,fontSize:20,textAlign:'center'}}>确定</Text>
                            </TouchableOpacity>
                            <Picker

                                selectedValue={selectedValue}
                                onValueChange={this._onChangeToString.bind(this)}
                            >
                                {
                                    
                                    data.map((item, key) => {
                                        return (
                                            <Picker.Item 
                                                label={item} 
                                                value={item} 
                                                color={THEME_BG_COLOR} 
                                                key={key}
                                             />
                                        )
                                    })
                                }

                            </Picker>
                        </View>

                    </TouchableOpacity>
                </Modal>
                <YTShareView 
                    ref={shareView => {this.shareView=shareView} }
                    shareCallback={(message)=>{
                        this.toast.show(message);
                    }}
                />
                <YTToast 
                    ref = {toast => {this.toast = toast}}
                />
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
        top: 30,
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingRight:10,
        paddingLeft:10
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
        right: 0,
        top: 30,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    changeBtn:{
        position: 'absolute',
        top: 30,
        backgroundColor: 'rgba(0,0,0,0)',
        left: deviceWidth/2 - scaleSize(110),
        flexDirection: 'row',
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    picker:{
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor: '#ffff'
    },
    changeModalView:{
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.3)'
    },
    doneBtn:{
        padding:10,
        flex: 1
    },
    btnText:{
        color: '#ffff',
        marginLeft: 5,
        marginRight: 5
    }
});

const toData = [
    "中文",
    "日语",
    "英文",
    "韩文",
    "法文",
    "俄文",
    "葡萄牙文",
    "西班牙文"
];

const fromData = [
    "中文",
    "英文"
]