import { StackNavigator, TabNavigator } from "react-navigation";
import MainContainer from "./MainContainer";
import NewWordContainer from './NewWordContainer';


const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        NewWord: { screen: NewWordContainer}
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
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
                headerLeft: null
            }
        }
    }
)

export default App;