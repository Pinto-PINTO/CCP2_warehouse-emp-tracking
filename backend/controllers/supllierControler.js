const Supplies = require("../models/supplyModel")
const mongoose = require('mongoose')

//get all workouts
const getStocks = async (req, res) => {
    //find all and sorting them in decending order
    const supply = await Supplies.find({}).sort({createdAt: -1})

    res.status(200).json(supply)
}


//get a single workout
const getAStock = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such supply'})
    }

    const supply = await Supplies.findById(id)

    if(!supply){
        return res.status(404).json({error: 'No such supply'})
    }

    res.status(200).json(supply)
}


//create a workout
const createStock = async (req, res) => {
    const {supplierName, supplierId, supplierEmail, supplierMobile, productList} = req.body

    try{
        const supply = await Supplies.create({ supplierName, supplierId, supplierEmail, supplierMobile, productList})
        res.status(200).json(supply)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//update a workout
const updateStocks = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Stock'})
    }

    const supply = await Supplies.findByIdAndUpdate({_id: id}, { ...req.body })

    if(!supply){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(supply)

}


//delete a workout

const deleteStock = async (req , res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Stock'})
    }

    const supply = await Supplies.findOneAndDelete({_id: id})

    if(!supply){
        return res.status(404).json({error: 'No such Stock'})
    }

    res.status(200).json(supply)
}

module.exports = {
    createStock,
    getStocks,
    getAStock,
    deleteStock,
    updateStocks
}