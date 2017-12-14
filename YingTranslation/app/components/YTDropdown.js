import React, { Component } from "react";
import {
    StyleSheet,
    Animated,
    View,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity
} from 'react-native';
import * as Colors from '../constants/Colors';

const W_Width = Dimensions.get('window').width;
const W_Height = Dimensions.get('window').height;

export default class YTDropdown extends Component {

    constructor(props){
        super(props);
        this.state = {
            height: new Animated.Value(0)
        }
    }

    show(){        
        Animated.timing(this.state.height,{
            toValue: this.props.data.length * 40 ,
            duration: 300
        }).start();
    }

    hide(){
        Animated.timing(this.state.height, {
            toValue: 0,
            duration: 300
        }).start();
    }

    _onClickItem(item){
        this.hide();
        this.props.selectIndex(item.index);
    }

    _renderItem(item){
        return (
            <TouchableOpacity 
                style={styles.item} 
                activeOpacity={0.8}
                onPress={()=>this._onClickItem(item)}
            >
                <Text style={styles.itemText}> {item.item} </Text>
            </TouchableOpacity>
        )
    }

    _keyExtractors(item, key) {
        return key;
    }

    render(){

        const {data} = this.props;
        const showClose = this.state.height>0;
        return(
            <View style={styles.bgContainer} >
                <Animated.View style={[styles.dropdownView, {height:this.state.height}]}>
                    <FlatList 
                        data = {data}
                        renderItem={this._renderItem.bind(this)}
                        keyExtractor={this._keyExtractors.bind(this)}
                        bounces={false}
                    />
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    bgContainer: { 
        position: 'absolute',
        top: 30, 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    dropdownView:{
        backgroundColor: "#ffff",
        width: W_Width
    },
    item:{
        height: 40,
        width: W_Width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.THEME_BG_COLOR,
    },
    itemText:{
        color: '#ffff'
    }
})