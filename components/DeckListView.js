import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import Ionicons from '@expo/vector-icons/Ionicons'
import { deleteDeck } from '../actions/shared'
import { deleteDeckFromAsync } from '../utils/api'

function AddCardBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
           )
}

function StartQuizBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
           )
}


class DeckListView extends Component {
    state = {
        errorMessage: ''
    }

    navigateAddCard = (deck, navigation) => {
        navigation.navigate('AddCards', { deckId: deck})
    }

    navigateStartQuiz = (deck, navigation) => {
        if(deck.questions.length === 0) {
            this.setState({
                errorMessage: 'Add cards to start Quiz'
            })
            return
        }
        navigation.navigate('QuizView', { deckId: deck.title})
    }

    navigateToDeckView = (navigation) => {
        navigation.navigate('Decks')
    }
  
    deleteDeck = (deckId, navigation) => {
        this.props.dispatch(deleteDeck(deckId))
        deleteDeckFromAsync(deckId)
        navigation.navigate('Decks')
    }

    render() {
        const { deck, navigation } = this.props
        const { errorMessage } = this.state
        return (
                <View style={styles.header}>
                    <Header leftComponent={() => {
                                return <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'} 
                                size={30} color={'black'} onPress={this.navigateToDeckView.bind(this, navigation)}/>
                            }}
                            centerComponent={{text:`${deck.title}`, color: '#fff'}} 
                            containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.titleText}>{deck.title}</Text>
                            <Text style={styles.titleTextCards}>
                                {deck.questions.length} 
                                {deck.questions.length === 1 ? ' card': ' cards'}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <TouchableOpacity onPress={this.deleteDeck.bind(this, deck.title, navigation)}>
                                <Text style={styles.deleteText}>Delete Deck</Text>
                            </TouchableOpacity>
                            {deck.questions.length !== 0 && <StartQuizBtn onPress={this.navigateStartQuiz.bind(this, deck, navigation)} />}
                            <AddCardBtn onPress={this.navigateAddCard.bind(this, deck.title, navigation)} />

                        </View>
                    </View>
                </View>
               )
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
        flex: 1,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 40,
        alignItems: 'center'
    },
    titleTextCards: {
        color: 'gray',
        fontSize: 20,
        padding: 10
    },
    bottom: {
        flexDirection: 'column-reverse',
        flex: 2,
        margin: 30 
    },
    deleteText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20
    },
    buttonText: {
        padding: 10,
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
    iosSubmitBtn: { 
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 7,
        height: 80,
        margin: 20
    },
    androidSubmitBtn: {
        backgroundColor: 'orange',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        textAlign: 'center',
        fontSize: 20,
        color: 'red'
    }
})

function mapStateToProps({decks} , props) {
    const deckId = props.route && props.route.params.deckId
    return {
        deck: decks[deckId],
        navigation: props.navigation
    }
}

export default connect(mapStateToProps)(DeckListView)
