import {
    TouchableOpacity,
    Text,
    StyleSheet,
    View
} from 'react-native';
import React ,{Component} from 'react';

export default class YTButton extends Component{

    render(){
        const {style, title, onPress, textColor} = this.props;
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
        borderRadius: 10
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        
    }
})