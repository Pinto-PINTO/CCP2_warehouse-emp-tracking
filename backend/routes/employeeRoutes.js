const express = require('express');
const {   
    getEmployees,
    getEmployee,
    createEmployee,
    deleteEmployee,
    updateEmployee} = require('../controllers/employeeController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();



// require auth for all workout routes
router.use(requireAuth)

//Get All items in the inventory 
router.get('/',getEmployees)

//Get a single Item
router.get('/:id',getEmployee)

//Post a new item to the inventory 
router.post('/',createEmployee )

//Delete a new item to the inventory 
router.delete('/:id',deleteEmployee)

//Update  a item to the inventory 
router.patch('/:id',updateEmployee)


module.exports = router