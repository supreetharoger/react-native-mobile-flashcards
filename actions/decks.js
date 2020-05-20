export const RECEIVE_DECKS='RECEIVE_DECKS'
export const ADD_DECK='ADD_DECK'
export const ADD_DECK_CARDS='ADD_DECK_CARDS'
export const DELETE_DECK='DELETE_DECK'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addDeckCards(deckId, question) {
    return {
        type: ADD_DECK_CARDS,
        question,
        deckId
    }
}

export function removeDeck(decks, deckId) {
    return {
        type: DELETE_DECK,
        deckId,
        decks
    }
}
