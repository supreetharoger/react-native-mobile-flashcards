import { receiveDecks, removeDeck } from '../actions/decks'
import { getDecks } from '../utils/api'

export function handleDecks() {
    return (dispatch) => {
        return getDecks().then((decks) => {
            dispatch(receiveDecks(decks))
        })
    }
}

export function deleteDeck(deckId) {
    return (dispatch) => {
        return getDecks().then((decks) => {
            dispatch(removeDeck(decks, deckId))
        })
    }
}
