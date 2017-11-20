import React from 'react';
import { 
    View,
    Text
 } from "react-native";

class MainContainer extends React.Component {
    static navigationOptions = {
        title: '首页'
    };
    render(){
        return(
            <View>
                <Text>MainContainer</Text>
            </View>
        )
    }
}

export default MainContainer;