import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'

function GoToDeckBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Go To Deck</Text>
            </TouchableOpacity>
           )
}

function StartQuizBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>
           )
}

class QuizResults extends Component {

    navigateBack = (deck, navigation) => {
        navigation.navigate('DeckListView', { deckId: deck})
    }

    navigateStartQuiz = (deck, navigation) => {
        navigation.navigate('QuizView', { deckId: deck})
    }



    render() {
        const { deck, navigation, score, total } = this.props
        return (
                 <View style={styles.header}>
                    <Header centerComponent={{text:`${deck.title}`, color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Text style={styles.titleText}>Your Score</Text>
                            <Text style={styles.titleText}>{score}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <StartQuizBtn onPress={this.navigateStartQuiz.bind(this, deck.title, navigation)} />
                            <GoToDeckBtn onPress={this.navigateBack.bind(this, deck.title, navigation)} />

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
    }
})
function mapStateToProps({decks} , props) {
    const deckId = props.route && props.route.params.deckId
    const score = props.route && props.route.params.score
    
    return {
        deck: decks[deckId],
        navigation: props.navigation,
        score: score
    }
}

export default connect(mapStateToProps)(QuizResults)
