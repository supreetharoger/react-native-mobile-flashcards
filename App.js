import React, { Component }  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import AddCards from './components/AddCards'
import DeckListView from './components/DeckListView'
import QuizView from './components/QuizView'
import QuizResults from './components/QuizResults'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getDecks, initialDecks } from './utils/api'
import { handleDecks } from './actions/shared'
import { setLocalNotification } from './utils/helpers'

class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }
    
    render() {
        const Tab = createBottomTabNavigator()
        const Stack = createStackNavigator()
        const store = createStore(reducer, middleware)

        const TabNav = () => (
         <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({focused, color, size}) => {
                                let iconName
                                if(route.name === 'Decks') {
                                    iconName = focused ? 'ios-book' : 'ios-bookmarks'
                                }else if(route.name === 'AddDeck') {
                                    iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline'
                                }
                                return <Ionicons name={iconName} size={30} color={'orange'}/>
                            },
                        })}
                        tabBarOptions={{
                            activeTintcolor: 'tomato',
                            inactiveTintcolor: 'gray',
                        }}
                    >
                        <Tab.Screen name="Decks" component={Decks}/>
                        <Tab.Screen name="AddDeck" component={AddDeck}/>
                    </Tab.Navigator>
                    )
        const MainNav = () => (
                <Stack.Navigator headerMode="Screen">
                    <Stack.Screen name="Home" component={TabNav} options={{headerShown:false}}/>
                    <Stack.Screen name="AddCards" component={AddCards}/>
                    <Stack.Screen name="DeckListView" component={DeckListView}/>
                    <Stack.Screen name="QuizView" component={QuizView}/>
                   <Stack.Screen name="QuizResults" component={QuizResults}/>
                </Stack.Navigator>
                )
        return (
                <Provider store={store}>
                <NavigationContainer>
                 <MainNav />   
                </NavigationContainer>
                </Provider>
               )
    }
}

export default App
