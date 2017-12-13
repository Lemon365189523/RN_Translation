import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { THEME_BG_COLOR  } from "../../constants/Colors";

export default class WordDetailsPage extends React.Component{
    
    componentDidMount() {
        console.log(this.props.navigation);
        
    }
    render(){

        return (
            <View>
                <Text> WordDetailsPage</Text>
            </View>
        )
    }
}