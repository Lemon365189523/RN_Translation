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

class Blink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showText: true }
    //每1000ms对showText的状态做一次取反操作
    //        setInterval(()=>{
    //           this.setState(pxxx => ({ showText: !pxxx }));
    //        },1000);

    //下面是完整写法
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 5000);
  }


  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : '';
    return (
      <Text>{display}</Text>
    );
  }

}


class Greeting extends React.Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

export default class MyHome extends React.Component {
  static navigationOptions = {
    headerTitle: '屌你荣福',
   
  }
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    console.log(">>>home", this.props);
    const { navigate } = this.props.navigation.navigate;
    let pic = { uri: 'https://facebook.github.io/react/img/logo_og.png' }
    return (
      <View>

        <Text style={styles.red}>红色</Text>
        <Text style={styles.blue}>蓝色</Text>

        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
        <Greeting name='Rexxar' />
        <Greeting name='Jaina' />
        <Greeting name='Valeera' />
        <Greeting name='Rexxar' />


        <Image source={pic} style={{ width: 193, height: 110 }} />

        <Button
          onPress={() => {
            console.log(">>>>>:" + NativeModules.MyIntentModule);
            NativeModules.MyIntentModule.startActivityFromJS("com.panrongfu.reactnativedemo.activities.MainActivity", "从js页面带来了一些糖果");
          }}
          title="点击打开原生" />

        <Button
          // onPress={() => navigate('Callback', { user: 'lucy' })}
          title="跳转到rn页面-Callback" />

      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    //justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  red: {
    textAlign: 'center',
    color: 'red',
  },
  blue: {
    justifyContent: 'flex-end',
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
