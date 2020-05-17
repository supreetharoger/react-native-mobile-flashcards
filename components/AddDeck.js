import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform,TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Header } from 'react-native-elements'
import { addDeck } from '../actions/decks'
import { saveDeckTitle } from '../utils/api'

function SubmitBtn({onPress}) {
    return (
            <TouchableOpacity onPress={onPress} 
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
                <Text style={styles.buttonText}>Create Deck</Text>
            </TouchableOpacity>
           )
}

class AddDeck extends Component {
    state = {
        title: ''
    }

    handleChange = (text) => {
        console.log(text)
        this.setState({
            title: text
        })
    }

    submit = () => {
        const deck = {
            title: this.state.title,
            questions: []
        }
        this.props.dispatch(addDeck(deck))
        saveDeckTitle(this.state.title)
        this.setState({
            title: ''
        })
        
    }

    render() {
        const { title } = this.state
        return (
                <View style={styles.header}>
                <Header centerComponent={{text: 'ADD DECK', color: '#fff'}} containerStyle={{backgroundColor: 'orange'}}/>
                <View style={styles.container}>

                    <View style={styles.row}>
                        <Text style={styles.titleText}>What is the title of your new Deck?</Text>
                    </View>
                    <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                    <View style={styles.row}>
                            <TextInput style={styles.textInput} 
                            placeholder="Deck Title"
                            onChangeText={text => this.handleChange(text)}/>
                    </View>
                    </TouchableOpacity>
                    
                    <View style={styles.bottom}>
                    <SubmitBtn onPress={this.submit} />
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
//        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 20
    },
    row: {
        flexDirection: 'row',
        flex:1, 
 //       alignItems: 'center',
   //     justifyContent: 'center',
        margin: 30
    },
    bottom: {
        flexDirection: 'column-reverse',
        flex: 2,
        margin: 30
        
    },
    titleText: {
        color: 'black',
        fontSize: 40,
    //    alignItems: 'center',
      //  justifyContent: 'center'
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
    }
})

export default connect()(AddDeck)
