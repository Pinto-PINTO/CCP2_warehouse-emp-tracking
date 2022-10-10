import { DistributionsContext } from "../context/DistributionContext";
import { useContext } from "react";

export const useDistributionsContext = () => {
    const context = useContext(DistributionsContext)

    if(!context) {
        throw Error('useDistributionsContext must be used inside an DistributionsContextProvider')
    }

    return context
}