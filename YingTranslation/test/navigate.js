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

import SceneScreen from './myScene';
import CallbackScreen from './myCallback';
import HomeScreen from './myHome';

 const navigateApp = (name) =>  StackNavigator({
    Home: { 
      screen: HomeScreen,
    },
    Callback: { screen: CallbackScreen },
    MyScene: { screen: SceneScreen }
},{
  initialRouteName: name
});

export default navigateApp;