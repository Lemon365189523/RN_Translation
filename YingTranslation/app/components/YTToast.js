
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    TouchableOpacity
} from 'react-native'
export const DURATION = { LENGTH_LONG: 2000, LENGTH_SHORT: 500 };
const OPACITY = 0.6;
import { PropTypes } from "prop-types";
import {
    deviceHeight ,
    deviceWidth ,
    scaleSize
} from '../constants/ScreenUtil';

export default class ToastUtil extends Component {
    static propTypes = {
        position: PropTypes.oneOf([
            'top',
            'center',
            'bottom',
        ]),
    }
    //初始props的值
    static defaultProps = {
        position: 'center',
    }

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            text: '',
            opacityValue: new Animated.Value(OPACITY),
        }
    }
    show(text, duration) {
        if (duration >= DURATION.LENGTH_LONG) {
            this.duration = DURATION.LENGTH_LONG;
        } else {
            this.duration = DURATION.LENGTH_SHORT;
        }
        this.setState({
            isShow: true,
            text: text,
        });
        this.isShow = true;
        this.state.opacityValue.setValue(OPACITY)
        this.close();
    }

    close() {
        if (!this.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            Animated.timing(
                this.state.opacityValue,
                {
                    toValue: 0.0,
                    duration: 1000,
                }
            ).start(() => {
                this.setState({
                    isShow: false,
                });
                this.isShow = false;
            });
        }, this.duration);
    }

    _onClickClose(){
        if (!this.isShow) return;
        this.timer && clearTimeout(this.timer);
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0.0,
                duration: 0,
            }
        ).start(() => {
            this.setState({
                isShow: false,
            });
            this.isShow = false;
        });
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }


    render() {
        let top;
        switch (this.props.position) {
            case 'top':
                top = 0;
                break;
            case 'center':
                top = deviceHeight / 2 - scaleSize(200);
                break;
            case 'bottom':
                top = deviceHeight - scaleSize(400);
                break;
        }

        let view = this.state.isShow ?
            <TouchableOpacity
                style={[styles.container, { top: top }]}
                pointerEvents="none"
                // activeOpacity={1}
                onPress={()=>this._onClickClose()}
            >
                <Animated.View
                    style={[styles.content, { opacity: this.state.opacityValue }]}
                >
                    <Text style={styles.text}>{this.state.text}</Text>
                </Animated.View>
            </TouchableOpacity> : null;
        return view;
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    content: {
        backgroundColor: 'black',
        opacity: OPACITY,
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'white',
        padding: 20
    },
})