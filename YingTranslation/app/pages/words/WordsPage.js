import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native';


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
                <Text style={styles.itemText}> {word.query}</Text>
                <Text style={styles.itemText2}>[ {word.translation} ]</Text>
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
        height: 50,
        backgroundColor: '#fff',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderRadius:10 ,
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemText:{
        fontSize: 16,
        fontFamily: 'Times New Roman',
        paddingLeft: 10
    },
    itemText2:{
        paddingLeft: 20
    }
});

