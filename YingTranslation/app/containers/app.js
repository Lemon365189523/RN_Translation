import { StackNavigator, TabNavigator } from "react-navigation";
import MainContainer from "./MainContainer";
import NewWordContainer from './NewWordContainer';
import {THEME_BG_COLOR} from '../constants/Colors';

const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        NewWord: { screen: NewWordContainer}
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
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
            }
        }
    }
);


const App = StackNavigator(
    {
        Home: {
            screen: TabContainer,
            navigationOptions: {
                headerLeft: null,
                headerStyle: {
                    backgroundColor: THEME_BG_COLOR,
                },
                headerTitleStyle:{
                    alignSelf: 'center'
                },
                headerTintColor: '#ffff'
            },

        }
    }
)

export default App;