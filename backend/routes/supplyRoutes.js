const express = require('express')
const Supplies = require('../models/supplyModel')
const router = express.Router()
const { 
    createStock,
    getStocks,
    getAStock,
    deleteStock,
    updateStocks
 } = require('../controllers/supllierControler')

router.get('/', getStocks)

//get a single stock
router.get('/:id', getAStock)

//post a new stock value
router.post('/', createStock)

//delete a stock
router.delete('/:id', deleteStock)

//update a stock
router.patch('/:id', updateStocks)

module.exports = router