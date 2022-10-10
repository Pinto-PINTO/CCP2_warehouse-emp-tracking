import React from "react";
import { createContext, useReducer } from "react";

export const DistributionsContext = createContext()

export const distributionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DISTRIBUTIONS' :
            return {
                distributions: action.payload
            }
        case 'CREATE_DISTRIBUTIONS' :
            return {
                distributions: [action.payload, ...state.distributions]
            }
        case 'DELETE_DISTRIBUTION' :
            return {
                distributions:state.distributions.filter((s)=>s._id!==action.payload._id)
            }
        case 'UPDATE_DISTRIBUTION' :
            state.distributions = state.distributions.filter((s)=>s._id!==action.payload._id)
            return{
                distributions:[action.payload,...state.distributions]
            }
        default:
            return state
    }
}

export const DistributionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(distributionsReducer, {
        distributions: null
    })

    //dispatch({type: 'SET_SHIPMENTS', payload: [{}, {}]})

    return (
        <DistributionsContext.Provider value={{...state, dispatch}}>
            { children }
        </DistributionsContext.Provider>
    )
}