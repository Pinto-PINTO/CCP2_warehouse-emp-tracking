const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleModel = new Schema({
    vehicleID: {
        type: String,
        required: true
    },
    vehicleName: {
        type: String,
        required: true
    },
    vehicleCategory: {
        type: String,
        required: true
    },
    manufacturedYear: {
        type: Number,
        required: true
    },
    milage: {
        type: Number,
        required: true
    },
    assignedDriverID: {
        type: String,
        
    },
    assignedDriverName: {
        type: String,
        
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Vehicles', vehicleModel)