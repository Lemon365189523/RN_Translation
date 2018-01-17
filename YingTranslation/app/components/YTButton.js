import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View
} from 'react-native';
import React ,{Component} from 'react';
import { scaleSize } from '../constants/ScreenUtil';

export default class YTButton extends Component{

    render(){
        const {style, title, onPress, textColor } = this.props;
        return (
            <TouchableOpacity 
                style={[styles.touchable,style]} 
                onPress={onPress}
            >  
                <View style={styles.wrapper}>
                    <Text 
                        style={[styles.text,{color:textColor}]}
                    >
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    touchable:{
        borderRadius: scaleSize(15)
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        
    }
})