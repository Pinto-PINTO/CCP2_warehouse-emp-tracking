import React from "react";
import { createContext,useReducer } from "react";

export const ItemsContext = createContext()



//arguments taken here are state:a reliable  version of the previouse state which is the items in the dipatcher,
//and the action which is an object contaning 2 properties type and payload payload is whatever that was  recived from the api call that we made
export const itemsReducer = (state,action) =>{
    switch(action.type){
        case 'SET_ITEMS':
            return{
                items:action.payload
            }
            case 'SET_ITEM': 
            
            return{
               items:action.payload
            }
        case 'CREATE_ITEM': 
            return{
               items:[action.payload,...state.items]
            }

            case 'DELETE_ITEM': 
            return{
               items:state.items.filter((i)=>i._id!==action.payload._id)
            }
            case 'UPDATE_ITEM': 
            state.items = state.items.filter((i)=>i._id!==action.payload._id)
            return{
                items:[action.payload,...state.items]
            }

        default:
            return state
            

    }
}   




    


export const ItemsContextProvider= ({children}) =>{

    const [state,dispatch] = useReducer(itemsReducer,{
            items:null
    });
    
    
        return(
            <ItemsContext.Provider value={{...state,dispatch}}>
                {children}
            </ItemsContext.Provider>
        )
    }


