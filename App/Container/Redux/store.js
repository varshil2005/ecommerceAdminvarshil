import { applyMiddleware, createStore } from "redux"
import { rootRedcer, rootReducer } from "./Reducer";
import { thunk } from "redux-thunk";


export const configureStore  = () => {
    const store = createStore(rootReducer,applyMiddleware(thunk) );
    return store
}