import { AsyncStorage } from 'react-native'
import { getInitialDecks } from '../utils/helpers'

const DECKS_KEY = 'MobileFlashcards:decks'

function initialDecks() {
    const decks = getInitialDecks()
    return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
}

export async function saveDeckTitle(title) {
    try {
        const deck = {
                        title: title,
                        questions: []}       
        return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
                [title]: deck}))
    }catch(error) {
        console.log(error.message)
    }
}   

export async function getDecks() {
    try {
        const decks = await AsyncStorage.getItem(DECKS_KEY)
        if(decks === null) {
            initialDecks()
            const loadDecks = await AsyncStorage.getItem(DECKS_KEY)
            return JSON.parse(loadDecks)
        }
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

export async function deleteDeckFromAsync(deckId) {
    try {
        return await AsyncStorage.getItem(DECKS_KEY)
            .then((results) => {
                const data = JSON.parse(results)
                data[deckId] = undefined
                delete data[deckId]
                if(Object.keys(data).length === 0) {
                    AsyncStorage.removeItem(DECKS_KEY)
                }else {
                    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
                }
            })
    }catch(error) {
        console.log(error.message)
    }
}
export async function addCardToDeck(deckId, card) {
    try {
        const decks = await AsyncStorage.getItem(DECKS_KEY)
        const decksL = JSON.parse(decks)
        const newCard = decksL[deckId].questions.concat(card)
        return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
             [deckId]: {
                    ...decksL[deckId],
                    questions: decksL[deckId].questions.concat(card)
                }

        }))
    }catch(error) {
        console.log(error.message)
    }
}

