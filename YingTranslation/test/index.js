
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  NativeModules,
  ScrollView,
  DeviceEventEmitter,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';

import {
    StackNavigator
 } from 'react-navigation';

import NavigateApp from './navigate';
import SplashScreen from "react-native-splash-screen";
class defaultComponent extends React.Component{
    componentDidMount(){
      SplashScreen.hide();
    }
    render(){
   // const { params } = this.props.navigation.state;
    console.log(">>>>>render",this.props);
        const App = NavigateApp("Home")
        return(
            <App screenProps={this.props}/>
        )
    }
}

export default defaultComponent;
// AppRegistry.registerComponent('navigateApp', () => defaultComponent);

