/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import App from "./containers/app";
import React, { Component } from "react";
import { 
    Alert,
    AsyncStorage
 } from "react-native";
import { Provider } from 'react-redux';
import store from './store/store';
import CodePush from 'react-native-code-push';
import Storage from 'react-native-storage';

//android-staging r9g2x1Fb_1sx8tmM7KSRa3AA7cja3e570e6d-1756-4fea-ac2a-83ad60454c8e
//ios-staging   1lX9t67WozG8DjDE0Az1QzZa7FpL3e570e6d-1756-4fea-ac2a-83ad60454c8e
const deploymentKey = "1lX9t67WozG8DjDE0Az1QzZa7FpL3e570e6d-1756-4fea-ac2a-83ad60454c8e";

var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

})
//全局设置storage单例
global.storage = storage;

class Root extends Component {

    componentDidMount(){
        this._cheakUpdate();
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