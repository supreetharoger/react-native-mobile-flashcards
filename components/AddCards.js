import React, { Component } from 'react'
import { View, Text,  Platform, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { addDeckCards } from '../actions/decks' 
import { addCardToDeck } from '../utils/api'
import Ionicons from '@expo/vector-icons/Ionicons'


function SubmitBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
           )
}

class AddCards extends Component {
    state = {
        question: '',
        answer: '',
        errorMessage: ''
    }
    handleQuestionChange = (text) => {
        this.setState({
            question: text,
            errorMessage: ''
        })
    }
    handleAnswerChange = (text) => {
        this.setState({
            answer: text,
            errorMessage: ''
        })
    }
    submit = (deckId, navigation) => {
        const { answer } = this.state
        if((this.state.question === '' || this.state.question === undefined) || (answer === '' || answer === undefined)) {
            this.setState({
                errorMessage: 'Please enter question or answer'
            })
            return
        }
        const question = {
            question: this.state.question,
           answer: this.state.answer
        } 
        this.props.dispatch(addDeckCards(deckId, question))
        addCardToDeck(deckId, question)      
        navigation.navigate('DeckListView', {deckId: deckId})  
        this.setState({
            question: '',
            answer: ''
        })
    }
    navigateToDeckListView = (deck, navigation) => {
        navigation.navigate('DeckListView', { deckId: deck})
    }

    render() {
        const { deck, navigation } = this.props
        const { errorMessage } = this.state
         return (
                <View style={styles.header}>
                    <Header leftComponent={() => {
                                return <Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-back' : 'md-arrow-round-back'}
                             size={30} color={'black'} onPress={this.navigateToDeckListView.bind(this, deck.title, navigation)}/>
                    }}
                    centerComponent={{text:`${deck.title}`, color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                    <View style={styles.container}>
                       <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                         <View style={styles.row}>
                            <TextInput style={styles.textInput} 
                            placeholder="Enter Question" multiline={true}
                            onChangeText={text => this.handleQuestionChange(text)} name="question"/>
                        </View>  
                         <View style={styles.row}>
                            <TextInput style={styles.textInput} 
                            placeholder="Enter Answer"
                            onChangeText={text => this.handleAnswerChange(text)} name="answer"/>
                        </View>
                        <View>
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </View>
                        </TouchableOpacity>
                        <View style={styles.bottom}>
                            <SubmitBtn onPress={this.submit.bind(this, deck.title, navigation)} />
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
        backgroundColor: 'white',
        padding: 20
    },
    row: {
        flexDirection: 'row',
        flex:1, 
        margin: 30
    },
    bottom: {
        flexDirection: 'column-reverse',
        flex: 2,
        margin: 30
        
    },
    titleText: {
        color: 'black',
        fontSize: 40
    },
    buttonText: {
        padding: 10,
        color: 'black',
        fontSize: 30,
        textAlign: 'center'
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
      margin: 40,
        color: 'black'
    },
    iosSubmitBtn: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 7,
        height: 80,
        marginLeft: 40,
        marginRight: 40
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

export default connect(mapStateToProps)(AddCards)
