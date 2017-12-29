import React ,{ Component } from 'react';
import {
    View,
    Modal,
    Image,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    StatusBar
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
    
    //初始props的值
    static defaultProps = {
        visible: false 
    }


    componentDidUpdate(nextProps, nextState){
        if (!nextProps.visible) {
           
            this._startAnimation();
        }
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
                    duration: 1000,
                    easing: Easing.linear
                }),
                Animated.sequence([
                    Animated.timing(this.state.springValue, {
                        toValue: 2,
                        duration: 500,
                    }),
                    Animated.timing(this.state.springValue, {
                        toValue: 1,
                        duration: 500,
                    })
                ])
               
            ]).start(() => { this._startAnimation() });//重复调用
        });

    }

    _onRequestClose(){

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
                onRequestClose={this._onRequestClose} //安卓必须要实现该方法
            >
                <StatusBar 
                    backgroundColor={'rgba(52,52,52,0.5)'}
                />
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
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        backgroundColor: 'rgba(52,52,52,0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    image:{
        height: 30,
        width: 30
    }
})
