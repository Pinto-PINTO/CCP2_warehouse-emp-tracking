import React from "react";
import { createContext, useReducer } from "react";

export const ShipmentsContext = createContext()

export const shipmentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIPMENTS' :
            return {
                shipments: action.payload
            }
        case 'CREATE_SHIPMENTS' :
            return {
                shipments: [action.payload, ...state.shipments]
            }
        case 'DELETE_SHIPMENT' :
            return {
                shipments:state.shipments.filter((s)=>s._id!==action.payload._id)
            }
        case 'UPDATE_SHIPMENT' :
            state.shipments = state.shipments.filter((s)=>s._id!==action.payload._id)
            return{
                shipments:[action.payload,...state.shipments]
            }
        default:
            return state
    }
}

export const ShipmentsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shipmentsReducer, {
        shipments: null
    })

    //dispatch({type: 'SET_SHIPMENTS', payload: [{}, {}]})

    return (
        <ShipmentsContext.Provider value={{...state, dispatch}}>
            { children }
        </ShipmentsContext.Provider>
    )
}