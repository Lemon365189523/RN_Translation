import React, { Component}from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class OCRContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: true
        }
    }

    static navigationOptions = {
        title: '拍照翻译',
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-camera" size={25} color={tintColor} />
        ),
        header: null,
        tabBarOnPress: (scene, jumpToIndex) => {
            console.log(scene);
            //拦截tabbar点击事件
            jumpToIndex(scene.index);
        },
    };


    componentDidMount(){

    }
    
    render(){
        return (
            <View> 
                <TouchableOpacity onPress={()=>{
                    
                    this.setState({
                        visible: false
                    },()=>{
                        this.props.navigation.goBack();
                    })
                }}>  
                    <Text> 关闭</Text>
                </TouchableOpacity>
            </View>
        )
    }
}