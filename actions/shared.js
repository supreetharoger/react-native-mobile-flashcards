import { receiveDecks } from '../actions/decks'
import { getDecks } from '../utils/api'

export function handleDecks() {
    return (dispatch) => {
        /*return getDecks()
            .then((decks) => {
                console.log("KO", decks)
                                    dispatch(receiveDecks(JSON.parse(decks)))
            })*/
        return getDecks().then((decks) => {
            console.log("KOO", decks)
        dispatch(receiveDecks(decks))
        })
    }
}
