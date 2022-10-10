

//              ------------------------------------
//              ----------- S C H E M A ------------
//              ------------------------------------


                const mongoose = require("mongoose");

                const Schema = mongoose.Schema

                const shipmentSchema = new Schema({
                    shipmentID:{
                        type: String,
                        required: true
                    },
                    productName:{
                        type: String,
                        required: true
                    },
                    count: {
                        type: Number,
                        required: true
                    },
                    supplierName: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: Date,
                        required: true
                    },
                    status: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    }
                }, { timestamps: true })

                module.exports = mongoose.model("Shipment", shipmentSchema)


