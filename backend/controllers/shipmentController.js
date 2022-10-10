const Shipment = require("../models/shipmentModel")
const mongoose = require("mongoose")



            // ---------------------------------------------
            // ----------- get all shipments ---------------
            // ---------------------------------------------


            const getShipments = async (req, res) => {
                const shipments = await Shipment.find({}).sort({createdAt: -1})

                res.status(200).json(shipments)
            }








            //----------------------------------------------
            //------------ get a single shipment------------
            //----------------------------------------------
            const getShipment = async (req, res) => {
                const { id } = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Shipment"})
                }

                const shipment = await Shipment.findById(id)

                if(!shipment) {
                    return res.status(404).json({error: "No Such Shipment"})
                }
                res.status(200).json(shipment)
            }








            //    -------------------------------------------
            //    --------Create a new shipment--------------
            //    -------------------------------------------
            const createShipment = async (req, res) => {
                const {shipmentID, productName, count, supplierName, date, status, description} = req.body

                // add doc to db
                try{
                    const shipment = await Shipment.create({shipmentID, productName, count, supplierName, date, status, description})
                    res.status(200).json(shipment)
                } catch (error) {
                    res.status(400).json({error: error.message})
                }
            }
        





            //    -------------------------------------------
            //    ----------Delete a shipment----------------
            //    -------------------------------------------
            const deleteShipment = async (req, res) => {
                const {id} = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Shipment"})
                }

                const shipment = await Shipment.findOneAndDelete({_id: id})

                if(!shipment) {
                    return res.status(400).json({error: "No Such Shipment"})
                }

                res.status(200).json(shipment)


            }


            //    -------------------------------------------
            //    ----------Update a shipment----------------
            //    -------------------------------------------
            const updateShipment = async (req, res) => {
                const {id} = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Shipment"})
                }

                const shipment = await Shipment.findByIdAndUpdate({_id: id}, {
                ...req.body
                })

                if(!shipment) {
                    return res.status(400).json({error: "No Such Shipment"})
                }

                res.status(200).json(shipment)
            }








module.exports = {
    getShipments,
    getShipment,
    createShipment,
    deleteShipment,
    updateShipment
}