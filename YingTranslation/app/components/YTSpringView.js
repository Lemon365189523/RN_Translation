import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {THEME_BG_COLOR} from '../constants/Colors'

export default class YTSpringView extends React.Component {

    constructor(props){
        super(props);
        this.state={
            subViewHeight: new Animated.Value(0),
            showSubView: false
        }
        
    }

    _onShowSubTile(){
        Animated.timing(this.state.subViewHeight,{
            toValue: this.props.subTitles.length * 20,
            duration: 200
        }).start();
    }

    _onHideSubtitle(){
        Animated.timing(this.state.subViewHeight, {
            toValue: 0,
            duration: 200
        }).start();
    }

    _onClickBtn(){
        if (this.state.showSubView) {
            this.setState({
                showSubView: false
            })
            this._onHideSubtitle();
        }else{
            this.setState({
                showSubView: true
            });
            this._onShowSubTile();
        }
    }

    render(){
        const {title, subTitles} = this.props;
        return (
            <View style={styles.wrapper}> 
                <View style={styles.titleWarpper}>
                    <Text > {title} </Text>
                    <TouchableOpacity  
                        onPress={this._onClickBtn.bind(this)}
                    >
                        <Ionicons 
                            name={this.state.showSubView ? "md-arrow-dropup-circle" :"md-arrow-dropdown-circle"}
                            size={13}
                            color={THEME_BG_COLOR}
                         /> 
                    </TouchableOpacity>
                </View>
                <Animated.View style={[styles.subViewWrapper,{height: this.state.subViewHeight}]}>
                    {
                        subTitles.map((item, key)=>{
                            return (
                                <View key={key} style={styles.subTitleText}>
                                    <Text style={{ fontSize: 12, color: THEME_BG_COLOR}}> {item}</Text>
                                </View>
                            )
                        })
                    }
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleWarpper :{
        flexDirection: 'row',
        // justifyContent:'center',
        alignItems:'center'
    },
    subViewWrapper:{
        overflow: 'hidden'
    },
    wrapper:{
        flexDirection: 'column',
    },
    subTitleText:{
        height: 20,
        marginLeft: 14,
        justifyContent: 'center'
    }
})