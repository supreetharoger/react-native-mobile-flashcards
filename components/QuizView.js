import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import Ionicons from '@expo/vector-icons/Ionicons'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function SubmitBtn({onPress, color, text, textColor}) {
        return (
            <TouchableOpacity onPress={onPress} 
            style={[(Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn),{backgroundColor: color}]}>
                <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
            </TouchableOpacity>
           )
}


class QuizView extends Component {
    state = {
        showAnswer: false,
        currentQuiz: 0,
        score: 0
    }


    navigateToResults = (answer, deck, navigation) => {
        const score = (answer === true) ? this.state.score + 1 : this.state.score
        navigation.navigate('QuizResults', { score: score, deckId: deck.title})
        this.setState({
                showAnswer: false,
                score: 0,
                currentQuiz: 0
        })
        clearLocalNotification()
            .then(setLocalNotification)
        
    }

    quizAnswer = (answer, deck, navigation) => {
        const totalQuiz = deck.questions.length - 1
        this.setState({
            score: answer === true ? this.state.score + 1 : this.state.score,
            currentQuiz: this.state.currentQuiz + 1,
            showAnswer: false
        })
    }
    showAnswer = () => {
        this.setState({
            showAnswer: true
        })
    }

    showQuestion = () => {
        this.setState({
            showAnswer: false
        })
    }

    navigateToDeckListView = (deck, navigation) => {
        navigation.navigate('DeckListView', { deckId: deck})
    }

    render() {
        const { deck, navigation } = this.props
        const { showAnswer, currentQuiz } = this.state
        const totalQuiz = deck.questions.length - 1
        const displayNumber = currentQuiz + 1
        return (
                <View style={styles.header}>
                    <Header leftComponent={() => {
                                return <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
                             size={30} color={'black'} onPress={this.navigateToDeckListView.bind(this, deck.title, navigation)}/>
                    }}
                    centerComponent={{text:`${deck.title}`, color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}>
                        <View> 
                            <Text>Question {currentQuiz + 1} of {totalQuiz+1}</Text>
                        </View>                        
                       {!showAnswer &&
                        <View style={styles.row}>
                            <Text style={styles.quizQuestion}>{deck.questions[currentQuiz].question}</Text>
                            <SubmitBtn onPress={this.showAnswer} color={'orange'} text={'Show Answer'} textColor={'black'}/>
                        </View>}
                        {showAnswer &&
                         <View style={styles.row}>
                                <Text style={styles.quizQuestion}>{deck.questions[currentQuiz].answer}</Text>
                                <SubmitBtn onPress={this.showQuestion} color={'orange'} text={'Show Question'} textColor={'black'}/>
                            </View>}
                        {showAnswer &&
                        <View style={styles.bottom}>
                            <SubmitBtn onPress={totalQuiz === currentQuiz ? 
                                this.navigateToResults.bind(this, false, deck, navigation)
                                : this.quizAnswer.bind(this,false, deck, navigation)}
                                color={'red'} text={'Incorrect'} textColor={'white'} />
                            <SubmitBtn onPress = {totalQuiz === currentQuiz ? 
                                this.navigateToResults.bind(this, true, deck, navigation)
                                : this.quizAnswer.bind(this, true, deck, navigation)}
                                color={'green'} text={'Correct'} textColor={'white'} />
                            <Text style={{textAlign: 'center', fontSize: 20}}>Did you get the answer?</Text>

                        </View>}
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
        alignItems: 'center',
        margin: 20
    },
    quizQuestion: {
        fontSize: 40,
        alignItems: 'center'
    },
    quizAnswer: {
        color: 'red',
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
        fontSize: 30,
        textAlign: 'center'
    },
    iosSubmitBtn: { 
        padding: 10,
        borderRadius: 7,
        height: 80,
        margin: 20
    },
    androidSubmitBtn: {
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
    return {
        deck: decks[deckId],
        navigation: props.navigation
    }
}

export default connect(mapStateToProps)(QuizView)
