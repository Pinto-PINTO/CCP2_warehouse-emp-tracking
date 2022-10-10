const Item = require('../models/itemModel')
const mongoose = require('mongoose')


//Get All Items in the inventory 

const getItems  = async (req,res)=>{
    const items = await Item.find({}).sort({createdAt:-1})

    res.status(200).json(items)
}





//Get a single item  in the inventory 

const getItem = async (req,res)=>{
        const {id} = req.params


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No item found for id:'+id})
        }
        const item = await Item.findById(id)
        if(!item){
            return res.status(404).json({error:'No such Item'})
        }

        res.status(200).json(item)
}



//Create a new item in the inventory 

const createItem = async (req,res) =>{
    const {name,batchNo,quantity,category,price,weight} = req.body

    try {
        //this item variable stores the data of the document that we just created from the aysnc call to the databse 
        const  item = await Item.create({name,batchNo,quantity,category,price,weight})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}





//Update Information regarding an item in the inventoy 

const updateItem = async(req,res)=>{
    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No item found for id:'+id})
    }

    const item = await  Item.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!item){
        return res.status(404).json({error:'No such Item'})
    }

    res.status(200).json(item)
}





//Delete an item in the inventory 

const deleteItem = async(req,res)=>{
    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No item found for id:'+id})
    }


        const item = await Item.findOneAndDelete({_id:id})
       
        if(!item){
            return res.status(404).json({error:'No such Item'})
        }
        res.status(200).json(item)
    
}




module.exports = {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,

    
}