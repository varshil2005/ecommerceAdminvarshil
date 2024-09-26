import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../Actiontype"

export const increament = () => (dispatch) => {
        dispatch({type : INCREMENT_COUNTER})
}

export const decreament = () => (dispatch) => {
        dispatch({type :DECREMENT_COUNTER})
}