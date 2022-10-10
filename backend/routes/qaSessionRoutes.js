const express = require('express')
const {   
    getQASessions ,
    getQASession ,
    createQASession ,
    deleteQASession ,
    updateQASession } = require('../controllers/qualityassuranceController')

const router = express.Router()


//Get All items in the inventory 

router.get('/',getQASessions)

//Get a single Item


router.get('/:id', getQASession)


//Post a new item to the inventory 
router.post('/', createQASession )


//Delete a new item to the inventory 
router.delete('/:id',deleteQASession)

//Update  a item to the inventory 
router.patch('/:id',updateQASession)









module.exports = router