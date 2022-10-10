import React from "react";
import { createContext,useReducer } from "react";

export const QualityAssuranceContext = createContext()



//arguments taken here are state:a reliable  version of the previouse state which is the items in the dipatcher,
//and the action which is an object contaning 2 properties type and payload payload is whatever that was  recived from the api call that we made
export const itemsReducer = (state,action) =>{
    switch(action.type){
     
            case 'SET_QSESSIONS': 
            return{
                QSessions:action.payload
            }
        case 'CREATE_ITEM': 
            return{
                QSessions:[action.payload,...state.QSessions]
            }

            case 'DELETE_ITEM': 
            return{
                QSessions:state.QSessions.filter((i)=>i._id!==action.payload._id)
            }
            case 'UPDATE_ITEM': 
            state.QSessions = state.QSessions.filter((i)=>i._id!==action.payload._id)
            return{
                QSessions:[action.payload,...state.QSessions]
            }

        default:
            return state
            

    }
}   




    


export const QualityAssuranceProvider= ({children}) =>{

    const [state,dispatch] = useReducer(itemsReducer,{
            QSessions:null
    });
    
    
        return(
            <QualityAssuranceContext.Provider value={{...state,dispatch}}>
                {children}
            </QualityAssuranceContext.Provider>
        )
    }


