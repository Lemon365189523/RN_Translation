import React, { Component } from "react";
import {  
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from "react-native";
import {THEME_BG_COLOR} from '../../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSize} from '../../constants/ScreenUtil'
 
export default class OCRResultPage extends Component {


    componentDidMount(){
        console.log(this.props);
    }

    _onClickGoBack(){
        const navigation = this.props.navigation;
        navigation.goBack();
    }
    
    _renderItenm(item){

        return(
            <View style={styles.itemView}>

            </View>
        )
    }

    _keyExtractors(item, key) {
        return key;
    }

    render(){
        const { imageData, resultData} = this.props.navigation.state.params;
        return(
            <View style={styles.container}>
                <View style={styles.headerView}>

                    <Image 
                        style={styles.image}
                        source={{ uri:"data:image/png;base64,"+imageData}}
                        resizeMode="cover"
                    />
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
        top: 25
    },
    itemView:{
        height: 100,
        margin: 10,
        backgroundColor: THEME_BG_COLOR
    }
});