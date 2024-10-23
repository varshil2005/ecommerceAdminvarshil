import { createContext, useReducer } from "react";
import { Counterreducer } from "./reducer/Counterreducer";
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./Actiontype";

const initialstate = {
    counter : 0,
  };


 export const CounterContext = createContext();


 export const Counterprovider = ( {children}) => {
        const [state,distpach] =  useReducer(Counterreducer,initialstate);

        const increment = (data) => {
            distpach({type:INCREMENT_COUNTER ,payload : data+1})
        }

        const decrement = (data) => {
            distpach({type:DECREMENT_COUNTER,payload : data-1})
        }

        return (
            <CounterContext.Provider

                value = {{
                    ...state,
                    increment,
                    decrement

                }}
            >

                {children}
            </CounterContext.Provider>
        )
 }
