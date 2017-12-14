import React ,{ Component } from 'react';
import {
    View,
    Modal,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    Easing
} from 'react-native';
import PropTypes from 'prop-types';
import Imgs from '../img';

export default class YTLoadingView extends Component {

    constructor(props){
        super(props);
        this.state = {
            rotation: new Animated.Value(0),
            springValue: new Animated.Value(1),
        }
    }

    componentDidMount(){
        this._startAnimation();
    }

    _startAnimation(){
        if (!this.props.visible) return;
        this.setState({
            rotation: new Animated.Value(0),
            springValue: new Animated.Value(1),
        },()=>{
            //parallel（同时）组合动画 sequence按顺序
            Animated.parallel([
                Animated.timing(this.state.rotation,{
                    toValue: 1, 
                    duration: 2000,
                    easing: Easing.linear
                }),
                Animated.sequence([
                    Animated.timing(this.state.springValue, {
                        toValue: 2,
                        duration: 1000,
                    }),
                    Animated.timing(this.state.springValue, {
                        toValue: 1,
                        duration: 1000,
                    })
                ])
               
            ]).start(() => { this._startAnimation() });//重复调用
        });

    }

    render(){

        const {visible} = this.props
        const spin = this.state.rotation.interpolate({ //spin映射过数据转换
            inputRange: [0, 1],                // [0,0.5,1]改成这样会有不同的效果
            outputRange: ['0deg', '360deg']    //  ['0deg', '360deg','0deg']改成这样会有不同的效果，
        });

    
        return(
            <Modal 
                animationType={"fade"}
                visible={visible}
                transparent={true}//是否透明
            >
                <View style={styles.loadingView}>
                    <Animated.Image 
                        source={Imgs.translation} 
                        style={[styles.image, { transform: [{ rotate: spin }, 
                                                            { scale: this.state.springValue }
                                                           ]}]}
                    />
                </View>
            </Modal>
        )
    }
}


YTLoadingView.propType = {
    visible: PropTypes.bool
}

const styles = StyleSheet.create({
    loadingView:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(52,52,52,0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        height: 30,
        width: 30
    }
})
