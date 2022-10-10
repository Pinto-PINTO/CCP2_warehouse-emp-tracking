import { VehicleContext } from "../context/VehicleContext";
import { useContext } from "react";

export const useVehicleContext = () => {
    const context = useContext(VehicleContext)

    if(!context){
        throw Error('useSupplierContext must be used inside an suppliercontextProvider')
    }

    return context
}