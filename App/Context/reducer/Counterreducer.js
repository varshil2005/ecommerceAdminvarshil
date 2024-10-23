import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "../Actiontype";

export const Counterreducer = (state,action) => {
    console.log("saasd",action);


    switch(action.type){
        case INCREMENT_COUNTER : 
            return {
                counter : action.payload
            }
        
        case DECREMENT_COUNTER : 
                return {
                    counter : action.payload
                }
        default : 
                return state
    }
    
}