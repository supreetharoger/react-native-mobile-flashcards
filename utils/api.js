import { AsyncStorage } from 'react-native'

export function initialDecks() {
    return AsyncStorage.setItem('decks', {})
}

export async function saveDeckTitle(title) {
    try {
        const deck = {
                        title: title,
                        questions: []}       
        return AsyncStorage.mergeItem('@mobile-flashcards:decks', JSON.stringify({
                [title]: deck}))
    }catch(error) {
        console.log(error.message)
    }
}   

export async function getDecks() {
    try {
        const decks = await AsyncStorage.getItem('@mobile-flashcards:decks')
        return JSON.parse(decks)
    }catch(error) {
        console.log(error.message)
    }

}

export function getDeck(key) {
    try {
        return AsyncStorage.getItem(key)
    }catch(error) {
        console.log(error.message)
    }
}

export function addCardToDeck(title, card) {
    try {
        
        return AsyncStorage.mergeItem('decks', JSON.stringify({
            questions: card
        }))
    }catch(error) {
        console.log(error.message)
    }
}

