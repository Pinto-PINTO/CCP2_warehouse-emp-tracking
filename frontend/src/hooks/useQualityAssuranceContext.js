import {QualityAssuranceContext} from '../context/QualityAssuranceContext'
import { useContext } from "react";




export const useQualityAssuranceContext = () =>{
    const context = useContext(QualityAssuranceContext)

    if(!context){
        throw Error('UseItemContext Must be Used Inside an ItemsContextProvider')
    }

    return context
}