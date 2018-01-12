import React from 'react';
import {
    View,
    WebView,
    Text
} from 'react-native';

export default class WebViewPage extends React.Component {
    render(){
        const { url } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <WebView 
                    source={{uri: url}}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    startLoadingState={true}
                />
                
            </View>
        )
    }

    _renderLoading(){
        return(
            <Text>加载中</Text>
        )
    }
}