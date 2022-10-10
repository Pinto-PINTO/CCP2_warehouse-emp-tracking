import {createContext, useReducer} from 'react'

export const SupplierContext = createContext()

export const SuppliesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SUPPLIERS': 
            return {
                supplies: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                supplies: [action.payload , ...state.supplies]
            }
        case 'DELETE_SUPPLIER':
            return {
                supplies: state.supplies.filter((s) => s._id !== action.payload._id )
            }
        case 'UPDATE_SUPPLIERS':
            state.supplies = state.supplies.filter((s)=>s._id!==action.payload._id)
            return{
                supplies:[action.payload,...state.supplies]
            }

        default:
            return state
    }
}

export const SupplierContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(SuppliesReducer, {
        supplies: null
    })

    return (
        <SupplierContext.Provider value={{...state, dispatch}}>
            {children}
        </SupplierContext.Provider>
    )
}