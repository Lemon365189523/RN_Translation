import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter,
    Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME_BG_COLOR} from '../../constants/Colors';
import { scaleSize } from '../../constants/ScreenUtil';

class WordsPage extends Component {

    componentDidMount(){
        const {  wordsDispatch} = this.props;
        wordsDispatch.findAllCollectionWords();
        this.subscription = DeviceEventEmitter.addListener('WordsPageUpdate', ()=>{
            wordsDispatch.findAllCollectionWords();
        } );
    }
    
    componentWillUnmount(){
        this.subscription.remove();
    }

    _keyExtractors(item,key){
        return key;
    }
    
    _onClickItem(word){
        this.props.navigation.navigate('Details',{title:word.query, info:word});
    }

    _onClickRemoveBtn(word){
        const { wordsDispatch } = this.props;
        Alert.alert(
            "是否取消收藏",
            null,
            [
                { text: '取消' },
                {
                    text: '确认',
                    onPress: () => {
                        wordsDispatch.removeWord(word);
                    }
                }
            ]
        )
    }

    // render 
    _renderItem(item){
        
        const word = item.item;
        return (
            <TouchableOpacity 
                style={styles.itemView} 
                activeOpacity={0.8}
                key={item.index}
                onPress={()=>this._onClickItem(word)}
            >
                <Text style={styles.itemText} numberOfLines={1}> 
                    {word.query}
                    <Text style={styles.itemText2}>   [ {word.translation} ]</Text>
                </Text>
                
                <TouchableOpacity 
                    style={styles.removeIcon}
                    onPress={() => this._onClickRemoveBtn(word)}
                > 
                    <Ionicons name={"ios-archive-outline"} color={THEME_BG_COLOR} size={20}/>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    render(){
        const { words} = this.props;
        
        return (
            <View>
                <FlatList
                    data={words.collectionWords}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractors.bind(this) }
                    bounces={false}
                />
            </View>
        )
    }

}

export default WordsPage;

const styles = StyleSheet.create({
    itemView:{
        height: scaleSize(100),
        backgroundColor: '#fff',
        marginTop: scaleSize(20),
        marginRight: scaleSize(20),
        marginLeft: scaleSize(20),
        borderRadius:scaleSize(20) ,
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemText:{
        fontSize: 16,
        fontFamily: 'Times New Roman',
        paddingLeft: 10,
        width: scaleSize(620)
    },
    itemText2:{
        paddingLeft: 20,
    },
    removeIcon:{
        position:'absolute',
        right: 20
    }
});

