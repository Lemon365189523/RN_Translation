import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyCallback extends React.Component{

   static navigationOptions = {
     title: 'Callback',
   };

    static defaultProps = {
        title: 'MyCallback'
    };

    render(){
    const { params } = this.props.navigation.state;
        return(
            <View>
              <Text>Hi! My name is {params.user}.</Text>
            </View>
        )
    }
}