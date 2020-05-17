import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

class DeckListView extends Component {
    render() {
        const { deck } = this.props
        console.log(deck.title)
        return (
                <View> 
                    <Text>{deck.title}</Text>
                    <Text>{deck.questions.length} cards</Text>
                </View>
               )
    }
}

function mapStateToProps({decks} , props) {
    console.log(props)
    const deckId = props.route && props.route.params.deckId
    return {
        deck: decks[deckId]
    }
}

export default connect(mapStateToProps)(DeckListView)
