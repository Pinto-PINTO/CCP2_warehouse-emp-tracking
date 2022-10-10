import React, { useEffect, useState } from 'react'
// import { useShipmentsContext } from '../hooks/useShipmentsContext'

// components
// import ShipmentDetails from '../components/ShipmentDetails'
// import ShipmentForm from '../components/ShipmentForm'



//-----------------------------------------------------------------------------------------------------------

export default function ShipmentHome() {

  // const {shipments, dispatch} = useShipmentsContext()
  const [shipments, setShipments] = useState(null)

    useEffect(() => {
        const fetchShipments = async () => {
            const response = await fetch('/api/shipments')
            const json = await response.json()

            if (response.ok) {
             // dispatch({type: 'SET_SHIPMENTS', payload: json})
             setShipments(json)
            }
        }

        fetchShipments()
    },[])






  return (
    <div className="ShipmentHome" >


      <div className='shipments'>
        {shipments && shipments.map((shipment) => (
            //<ShipmentDetails key={shipment._id} shipment={shipment}/>
            <p key={shipment._id}>{shipment.shipmentID} </p>
        ))}
      </div>  
      

      {/* <ShipmentForm /> */}


    </div>
  )
}
