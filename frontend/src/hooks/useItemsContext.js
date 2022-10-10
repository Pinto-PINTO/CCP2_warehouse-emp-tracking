import { ItemsContext } from "../context/ItemContext";
import { useContext } from "react";




export const useItemsContext = () =>{
    const context = useContext(ItemsContext)

    if(!context){
        throw Error('UseItemContext Must be Used Inside an ItemsContextProvider')
    }

    return context
}