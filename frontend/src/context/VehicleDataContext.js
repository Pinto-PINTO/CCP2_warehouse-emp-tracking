import React from "react";
import { createContext , useState } from "react";

export const VehicleDataContext = createContext();

export const VehicleDataContextProvider = ({ children }) => {
    const [vehicleDriver, setVehicleDriver] = useState('');

    return(
        <VehicleDataContext.Provider value={{vehicleDriver, setVehicleDriver}}>
            {children}
        </VehicleDataContext.Provider>
    )
}