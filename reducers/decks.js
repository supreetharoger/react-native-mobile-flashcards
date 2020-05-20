import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARDS, DELETE_DECK } from '../actions/decks'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case ADD_DECK_CARDS:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat(action.question)
                }
            }
        case DELETE_DECK:
            return Object.keys(state).filter(key => key !== action.deckId)
                  .reduce( (res, key) => Object.assign(res, { [key]: state[key] }), {} )                
        default: 
            return state
    }
}

export default decks

