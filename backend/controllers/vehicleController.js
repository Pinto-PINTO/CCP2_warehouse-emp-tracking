const Vehicles = require('../models/vehicleModel')
const mongoose = require('mongoose')

//get all workouts
const getVehicles = async (req, res) => {
    //find all and sorting them in decending order
    const vehicles = await Vehicles.find({}).sort({createdAt: -1})

    res.status(200).json(vehicles)
}


//get a single workout
const getAVehicle = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such vehicles'})
    }

    const vehicles = await Vehicles.findById(id)

    if(!vehicles){
        return res.status(404).json({error: 'No such vehicles'})
    }

    res.status(200).json(vehicles)
}


//create a workout
const registerVehicle = async (req, res) => {
    const {vehicleID, vehicleName, vehicleCategory, manufacturedYear, milage, assignedDriverID, assignedDriverName, status} = req.body

    try{
        const vehicles = await Vehicles.create({ vehicleID, vehicleName, vehicleCategory, manufacturedYear, milage, assignedDriverID, assignedDriverName, status})
        res.status(200).json(vehicles)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//update a workout
const updateVehicle = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Stock'})
    }

    const vehicles = await Vehicles.findByIdAndUpdate({_id: id}, { ...req.body })

    if(!vehicles){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(vehicles)

}


//delete a workout

const deleteVehicle = async (req , res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Stock'})
    }

    const vehicles = await Vehicles.findOneAndDelete({_id: id})

    if(!vehicles){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(vehicles)
}

module.exports = {
    registerVehicle,
    getVehicles,
    getAVehicle,
    deleteVehicle,
    updateVehicle
}