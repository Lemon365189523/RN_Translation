import React from 'react';
import {
    View,
    WebView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import ImageSources from "../../img";
import { THEME_BG_COLOR } from '../../constants/Colors';

export default class WebViewPage extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        var headerRight;
        if (navigation.state.params.loading || navigation.state.params.loading === undefined) {
            headerRight = (
                <View style={{ paddingRight: 10 }}>
                    <ActivityIndicator color={'#ffff'} />
                </View>
            );
        }else{
            headerRight = (<View/>)
        }

        return {
            headerRight: headerRight
        }
    }

    _renderError(){

        return(
            <View
                style={styles.errView}
            >   
                <Image source={ImageSources.error} style={{height:64,width:64}}/>
                <Text style={styles.errText}>请求出错,请稍后再试</Text>
            </View>
        )
    }

    _renderLoading() {
        console.log('rrrrrrr')
        return (
            <View style={{
                flex: 1, justifyContent: 'center',
                alignItems: 'center',
                 backgroundColor: 'red'
            }}>
                <Text style={styles.loadingText}>
                    页面正在加载...
                </Text>
            </View>
        )
    }

    render(){
        const { url } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <WebView 
                    source={{uri: url}}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    startLoadingState={true}
                    automaticallyAdjustContentInsets={true}
                    renderError={this._renderError}
                    onLoadEnd={() => { this.props.navigation.setParams({loading:false})}}
                    onLoadStart={() => { this.props.navigation.setParams({ loading: true })}}
                    onLoad={() => { this.props.navigation.setParams({ loading: false }) }}
                    onError={() => { this.props.navigation.setParams({ loading: false }) }}
                    style={{width:'100%',height:'100%'}}

                />
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    errView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    errText:{
        marginTop: 5,
        fontSize: 12,
        color: THEME_BG_COLOR
    },
    loadingText: {
        color: '#8a8a8a',
        fontSize: 16
    }
})