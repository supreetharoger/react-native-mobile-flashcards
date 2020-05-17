import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, AsyncStorage } from 'react-native'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { handleDecks } from '../actions/shared'
import { receiveDecks } from '../actions/decks'
import { AppLoading } from 'expo'
import { Header } from 'react-native-elements'
import AddCards from './AddCards'
import DeckListView from './DeckListView'


class Decks extends Component {

    state = {
        ready: false
    }

    async componentDidMount() {
        const a = { sup: {title: 'merge', questions: []}}
        const b = { supi: {title: 'erge', questions: []}}
        await this.props.dispatch(handleDecks())
        this.setState(() => ({ready: true}))
    
    }
    onPress = (deck, navigation) => {
        console.log("DECLL")
        navigation.navigate('DeckListView', { deckId: deck})
    }

    renderItem(deck, navigation) {
        console.log("DECK", deck)
        return (             
            <TouchableOpacity style={styles.row} key={deck.item[1].title} onPress={this.onPress.bind(this, deck.item[1].title, navigation)}>       
                <View>
                    <Text style={styles.deckText}>{deck.item[1].title}</Text>
                    <Text style={styles.deckTextCards}>{deck.item[1].questions && deck.item[1].questions.length} cards</Text>
                </View>
            </TouchableOpacity>
            )
    }
    render() {
        const { decks } = this.props
        const { navigation } = this.props
        const { ready} = this.state
//        const results = Object.entries(decks)
 //       console.log("POLLLL", results)
        if (ready === false) {
            return <ActivityIndicator />
        }
        if(ready === true) {
            console.log("JII", decks)
        const results = Object.entries(decks)
        console.log("RG", results)

        return (
                <View style={styles.header}>
                    <Header centerComponent={{text: 'DECKS', color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}> 
                        <FlatList data={results} renderItem={(item) => this.renderItem(item, navigation)} />
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
        margin: 30,
        backgroundColor: '#eee',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 7
    },
    deckText: {
        fontSize: 40,
        alignItems: 'center'
    },
    deckTextCards: {
        color: 'gray',
        fontSize: 20,
        padding: 10
    }

})

function mapStateToProps({decks}, props) {
    console.log("PLOP", props)
    return {
        decks,
        navigation: props.navigation
    }
}

export default connect(mapStateToProps)(Decks)
