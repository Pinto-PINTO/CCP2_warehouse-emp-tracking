const express = require('express')
const router = express.Router()
const { 
    registerVehicle,
    getVehicles,
    getAVehicle,
    deleteVehicle,
    updateVehicle
 } = require('../controllers/vehicleController')

router.get('/', getVehicles)

//get a single stock
router.get('/:id', getAVehicle)

//post a new stock value
router.post('/', registerVehicle)

//delete a stock
router.delete('/:id', deleteVehicle)

//update a stock
router.patch('/:id', updateVehicle)

module.exports = router