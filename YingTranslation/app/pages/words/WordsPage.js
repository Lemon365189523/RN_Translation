import React, {Component} from 'react';
import {
    View,

} from 'react-native';


class WordsPage extends Component {

    componentDidMount(){
        const {  wordsHandleDispatch} = this.props;
        wordsHandleDispatch.findAllCollectionWord();
    }

    render(){
        const { words} = this.props;
        console.log(words);
        return (
            <View>

            </View>
        )
    }

}

export default WordsPage;