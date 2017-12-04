/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from "./containers/app";
import React, { Component } from "react";
import { Alert } from "react-native";
import { Provider } from 'react-redux';
import store from './store/store';
import CodePush from 'react-native-code-push';


//android-staging r9g2x1Fb_1sx8tmM7KSRa3AA7cja3e570e6d-1756-4fea-ac2a-83ad60454c8e
//ios-staging   1lX9t67WozG8DjDE0Az1QzZa7FpL3e570e6d-1756-4fea-ac2a-83ad60454c8e
const deploymentKey = "1lX9t67WozG8DjDE0Az1QzZa7FpL3e570e6d-1756-4fea-ac2a-83ad60454c8e";
// const Root = () => (
    // <Provider store={store}>
    //     <App />
    // </Provider>
// );
class Root extends Component {

    componentDidMount(){
        // this._cheakUpdate();
    }
    
    _cheakUpdate(){
        CodePush.checkForUpdate(deploymentKey).then((update) => {
            if (!update) {
                Alert.alert("提示", "已是最新版本--", [
                    {
                        text: "Ok", onPress: () => {
                            console.log("点了OK");
                        }
                    }
                ]);
            } else {
                codePush.sync({
                    deploymentKey: deploymentKey,
                    updateDialog: {
                        optionalIgnoreButtonLabel: '稍后',
                        optionalInstallButtonLabel: '立即更新',
                        optionalUpdateMessage: '有新版本了，是否更新？',
                        title: '更新提示'
                    },
                    installMode: CodePush.InstallMode.IMMEDIATE,

                },
                    (status) => {
                        switch (status) {
                            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                                console.log("DOWNLOADING_PACKAGE");
                                break;
                            case CodePush.SyncStatus.INSTALLING_UPDATE:
                                console.log(" INSTALLING_UPDATE");
                                break;
                        }
                    },
                    (progress) => {
                        console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
                    }
                );
            }
        })
    }

    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

export default Root;