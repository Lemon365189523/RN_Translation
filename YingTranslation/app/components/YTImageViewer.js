import React, {Component} from 'react';
import {
    Image,
    View,
    StyleSheet,
    Modal,
    StatusBar,
    PanResponder
} from 'react-native';


export default class YTImageViewer extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount(){
        this.contentPan =  PanResponder.create({
            
        });

        this.imagePan = PanResponder.create({

        })
        
    }

    render(){
        const {style, source, resizeMode} = this.props;
        return(
            <View
                style={[style]}

            >
               
                <Modal
                    visible={true}
                    transparent={true}
                    onRequestClose={()=>{}}
                >
                    <StatusBar
                        backgroundColor="black"
                    />
                    <View style={styles.modelView}>

                    </View>
                </Modal>
                <Image 
                    style={styles.image}
                    source={source}
                    resizeMode={resizeMode}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        flex:1
    },
    modelView:{
        backgroundColor:'black',
        flex: 1
    }
})

//style={styles.image}
// source = {{ uri: "data:image/png;base64," + imageData }}
// resizeMode = "cover"