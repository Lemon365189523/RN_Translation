import { StackNavigator, TabNavigator } from "react-navigation";
import MainContainer from "./MainContainer";
import NewWordContainer from './NewWordContainer';
import {THEME_BG_COLOR} from '../constants/Colors';
import WordDetailsPage from '../pages/words/WordDetailsPage';
import WebViewPage from '../pages/webViewpage';
import OCRContainer from "./OCRContainer";
import TabCenterContainer from './TabBarCenterContainer';
import OCRResultContainer from './OCRResultContainer';
import {
    View,
    Animated,
    Easing
} from 'react-native';
import React from "react";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';


const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        TabCenter: { screen: TabCenterContainer },
        NewWord: { screen: NewWordContainer},
        
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: THEME_BG_COLOR,
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            },
            
        }
    }
);



//基本的导航栏设置
const navigationOptions = {
    headerBackTitle: null,
    headerStyle: {
        backgroundColor: THEME_BG_COLOR,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        alignSelf: 'center',
    },
    headerTintColor: '#ffff',
};

//自定义导航栏
const StackOptions = (({navigation}) => {
    //通过navigation 可在各自的页面中设置title等其他属性
    let {state} = navigation;
    //需要对navigationOptions进行深拷贝 这样才不影响到使用navigationOptions的地方
    var options = JSON.parse(JSON.stringify(navigationOptions));
    if (state.params && state.params.title){
        options.headerTitle = state.params.title ;
    }
    // options.headerRight = headerRightView(navigation);//添加一个空view让安卓端的标题居中
    return options;
})

//函数作为一个子参数是无效的，应该调用这个函数而不是返回它
const headerRightView = ((navigation) => { 
    if (navigation.state.params.headerRight) {
        return navigation.state.params.headerRight;
    }else{
        <View> </View>;
    }
     
});
//StackNavigator(RouteConfigs, StackNavigatorConfig) 
const App = StackNavigator({
    Home: {
        screen: TabContainer,
        navigationOptions: navigationOptions
    },
    Details:{
        screen: WordDetailsPage,
        navigationOptions: ({ navigation }) => StackOptions({ navigation })
    },
    WebView:{
        screen: WebViewPage,
        navigationOptions: ({ navigation }) => StackOptions({ navigation })
    },
    OCR:{
        screen: OCRContainer,
        navigationOptions: ({ navigation }) => StackOptions({ navigation })
    },
    OCRResult:{
        screen: OCRResultContainer,
        navigationOptions: {
            headerTintColor: '#ffff',
            gesturesEnabled: false,
        },
    },
}, {
        // transitionConfig: (sceneProps) => transitionConfig(sceneProps),
});

//这样来判断跳转动画不完善
const transitionConfig = (sceneProps) => {
    if (!sceneProps.scene) {
        return
    }
    console.log(sceneProps);
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    var transitionSpec = {};
    console.log(transition);
    if (params.transition) {
        console.log(route.routeName)
        transitionSpec = {
            duration: 0,
            easing: Easing.circle,
            timing: Animated.timing,
        }
    }

    return {
        screenInterpolator: CardStackStyleInterpolator.forVertical,
        transitionSpec: transitionSpec
    }
}


export default App ;