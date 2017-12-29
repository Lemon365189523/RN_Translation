import React, { Component } from "react";
import {  
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    StatusBar,
    Text
} from "react-native";
import {THEME_BG_COLOR} from '../../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSize,onePixel} from '../../constants/ScreenUtil';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class OCRResultPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible:false
        }
    }

    componentDidMount(){
        console.log(this.props);
    }

    _onClickGoBack(){
        const navigation = this.props.navigation;
        navigation.goBack();
    }
    
    _renderItenm(data){
        return(
            <View style={styles.itemView}>
                <Text style={styles.text}> {data.item.words}</Text>
                <View style={styles.line}/>
                <Text style={styles.text}> {data.item.words}</Text>
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
        const { imageData, resultData} = this.props.navigation.state.params;
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
                </View>
                <FlatList
                    data={resultData.Result.lines}
                    renderItem={this._renderItenm.bind(this)}
                    keyExtractor={this._keyExtractors.bind(this)}
                    style={{marginTop:5}}
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
    }
});