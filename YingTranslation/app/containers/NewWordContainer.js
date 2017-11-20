import React from 'react';
import {
    View,
    Text
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


class MainContainer extends React.Component {
    static navigationOptions = {
        title: '生词本',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-create" size={25} color={tintColor} />
        )
    };

    render() {
        return (
            <View>
                <Text>生词本</Text>

            </View>
        )
    }
}

export default MainContainer;