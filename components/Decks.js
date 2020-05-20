import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage, Animated } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { handleDecks } from '../actions/shared'
import { receiveDecks } from '../actions/decks'
import { AppLoading } from 'expo'
import { Header } from 'react-native-elements'
import AddCards from './AddCards'
import DeckListView from './DeckListView'
import { MaterialCommunityIcons }  from '@expo/vector-icons'


class Decks extends Component {

    state = {
        ready: false,
        animatedValue: new Animated.Value(1)
    }

    async componentDidMount() {
        await this.props.dispatch(handleDecks())
        this.setState(() => ({ready: true}))
    
    }
    onPress = (deck, navigation) => {
        Animated.timing(this.state.animatedValue, {
            toValue: 0,
            duration: 5000
        }).start()
        navigation.navigate('DeckListView', { deckId: deck})
        this.setState({
            animatedValue: new Animated.Value(1)
        })
    }

    renderItem(deck, navigation) {
        const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
        return (            
            <AnimatedTouchable  style={[styles.row,{opacity: this.state.animatedValue}]} key={deck.item[1].title}        
                    onPress={this.onPress.bind(this, deck.item[1].title, navigation)}>       
                <View>
                    <Text style={styles.deckText}>
                    <MaterialCommunityIcons name="cards" size={30} color="black" style={styles.deckImage} />
                    {deck.item[1].title}</Text>
                    <Text style={styles.deckTextCards}>
                        {deck.item[1].questions && deck.item[1].questions.length} 
                        {deck.item[1].questions.length === 1 ? ' card' : ' cards'}
                    </Text>
                </View>
            </AnimatedTouchable>
            )
    }
    render() {
        const { decks, navigation } = this.props
        const { ready} = this.state
        if (ready === false) {
            return <ActivityIndicator />
        }
        if(ready === true) {
        const results = Object.entries(decks)

        return (
                <View style={styles.header}>
                    <Header centerComponent={{text: 'DECKS', color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}> 
                        <FlatList data={results} renderItem={(item) => this.renderItem(item, navigation)} 
                        keyExtractor={(item,index) => {
                            return item[0]
                        }}/>
                    </View>                
                </View>
            )}
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20
    },
    row: {
        flexDirection: 'column',
        flex:1, 
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        backgroundColor: '#eee',
        borderWidth: 4,
        borderColor: 'rgba(232, 123, 27, 0.5)',
        borderRadius: 7
    },
    deckText: {
        fontSize: 40,
        alignItems: 'center',
        margin: 20
    },
    deckTextCards: {
        color: 'gray',
        fontSize: 20,
        margin: 20,
        paddingLeft: 30
    },
    deckImage: {
        color: 'orange'
    }

})

function mapStateToProps({decks}, props) {
    return {
        decks,
        navigation: props.navigation
    }
}

export default connect(mapStateToProps)(Decks)
