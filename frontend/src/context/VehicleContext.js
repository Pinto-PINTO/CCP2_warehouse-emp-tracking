import {createContext, useReducer} from 'react'

export const VehicleContext = createContext()

export const VehicleReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VEHICLES': 
            return {
                vehicles: action.payload
            }
        case 'CREATE_VEHICLE':
            return {
                vehicles: [action.payload , ...state.vehicles]
            }
        case 'DELETE_VEHICLE':
            return {
                vehicles: state.vehicles.filter((s) => s._id !== action.payload._id )
            }
        case 'UPDATE_VEHICLE':
            state.vehicles = state.vehicles.filter((s)=>s._id!==action.payload._id)
            return{
                vehicles:[action.payload,...state.vehicles]
            }
        case 'GET_TRUCKS':
            state.vehicles =  action.payload
            state.vehicles = state.vehicles.filter((s)=>s.vehicleCategory=="Truck")
            return{
                vehicles: [...state.vehicles]
            }
        case 'GET_FORKLIFTS':
                    state.vehicles =  action.payload
                    state.vehicles = state.vehicles.filter((s)=>s.vehicleCategory=="Forklift")
                    return{
                        vehicles: [...state.vehicles]
                    }
        case 'GET_PERSONAL_VEHICLES':
                    state.vehicles =  action.payload
                    state.vehicles = state.vehicles.filter((s)=>s.vehicleCategory=="GeneralVehicles")
                    return{
                        vehicles: [...state.vehicles]
                    }
        case 'GET_UTILITIES':
                    state.vehicles =  action.payload
                    state.vehicles = state.vehicles.filter((s)=>s.vehicleCategory=="Utilities")
                    return{
                        vehicles: [...state.vehicles]
                    }

        default:
            return state
    }
}

export const VehicleContextProvidor = ({children}) => {

    const [state, dispatch] = useReducer(VehicleReducer, {
        vehicles: null
    })

    return (
        <VehicleContext.Provider value={{...state, dispatch}}>
            {children}
        </VehicleContext.Provider>
    )
}