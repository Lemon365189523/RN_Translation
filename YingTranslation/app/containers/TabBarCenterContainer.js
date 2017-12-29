import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class OCRContainer extends Component {

    constructor(props) {
        super(props);
        
    }

    static navigationOptions = (navigator) => {
        return {
            title: '拍照翻译',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-camera" size={25} color={tintColor} />
            ),
            header: null,
            tabBarOnPress: (({ route, index }, jumpToIndex) => {
                console.log(navigator);
                // alert(index);
                // 只有调用jumpToIndex方法之后才会真正的跳转页面。
                // jumpToIndex(index);
                navigator.navigation.navigate('OCR');
            }),

        }
    };

    render() {
        return (
            <View/>
        )
    }
}