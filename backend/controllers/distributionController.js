const Distribution = require("../models/distributionModel")
const mongoose = require("mongoose")



            // ---------------------------------------------
            // ----------- get all distributions ---------------
            // ---------------------------------------------


            const getDistributions = async (req, res) => {
                const distributions = await Distribution.find({}).sort({createdAt: -1})

                res.status(200).json(distributions)
            }








            //----------------------------------------------
            //------------ get a single distribution--------
            //----------------------------------------------
            const getDistribution = async (req, res) => {
                const { id } = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Distribution"})
                }

                const distribution = await Distribution.findById(id)

                if(!distribution) {
                    return res.status(404).json({error: "No Such Distribution"})
                }
                res.status(200).json(distribution)
            }








            //    -------------------------------------------
            //    --------Create a new distribution--------------
            //    -------------------------------------------
            const createDistribution = async (req, res) => {
                const {date, time, itemCode, quantity, location, distance, duration, driverID, vehicleID} = req.body

                // add doc to db
                try{
                    const distribution = await Distribution.create({date, time, itemCode, quantity, location, distance, duration, driverID, vehicleID})
                    res.status(200).json(distribution)
                } catch (error) {
                    res.status(400).json({error: error.message})
                }
            }
        





            //    -------------------------------------------
            //    ----------Delete a distribution----------------
            //    -------------------------------------------
            const deleteDistribution = async (req, res) => {
                const {id} = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Distribution"})
                }

                const distribution = await Distribution.findOneAndDelete({_id: id})

                if(!distribution) {
                    return res.status(400).json({error: "No Such Distribution"})
                }

                res.status(200).json(distribution)


            }


            //    -------------------------------------------
            //    ----------Update a distribution----------------
            //    -------------------------------------------
            const updateDistribution = async (req, res) => {
                const {id} = req.params

                if(!mongoose.Types.ObjectId.isValid(id)){
                    return res.status(404).json({error : "No Such Distribution"})
                }

                const distribution = await Distribution.findByIdAndUpdate({_id: id}, {
                ...req.body
                })

                if(!distribution) {
                    return res.status(400).json({error: "No Such Distribution"})
                }

                res.status(200).json(distribution)
            }








module.exports = {
    getDistributions,
    getDistribution,
    createDistribution,
    deleteDistribution,
    updateDistribution
}