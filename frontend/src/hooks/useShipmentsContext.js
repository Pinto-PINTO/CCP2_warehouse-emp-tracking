import { ShipmentsContext } from "../context/ShipmentContext";
import { useContext } from "react";

export const useShipmentsContext = () => {
    const context = useContext(ShipmentsContext)

    if(!context) {
        throw Error('useShipmentsContext must be used inside an ShipmentsContextProvider')
    }

    return context
}