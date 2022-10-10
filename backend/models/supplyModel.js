const mongoose = require('mongoose')

const Schema = mongoose.Schema

const supplyShema = new Schema({
    supplierName: {
        type: String,
        required: true
    },
    supplierId: {
        type: Number,
        required: true
    },
    supplierEmail: {
        type: String,
        required: true
    },
    supplierMobile: {
        type: Number,
        required: true
    },
    productList: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Supplies', supplyShema)