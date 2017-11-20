import React from 'react';
import { 
    View,
    Text
 } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


class MainContainer extends React.Component {
    static navigationOptions = {
        title: '翻译',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" size={25} color={tintColor} />
        )
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