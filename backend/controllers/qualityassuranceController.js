const QSession = require('../models/QualityAssurance')
const mongoose = require('mongoose')


//Get All QASessions in the inventory 

const getQASessions   = async (req,res)=>{
    const QASessions= await QSession.find({}).sort({createdAt:-1})

    res.status(200).json(QASessions)
}





//Get a single QASession   in the inventory 

const getQASession   = async (req,res)=>{
        const {id} = req.params


        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No item found for id:'+id})
        }
        const QASession = await QSession.findById(id)
        if(!QASession){
            return res.status(404).json({error:'No such Item'})
        }

        res.status(200).json(QASession)
}



//Create a new QASesssion  in the inventory 

const createQASession = async (req,res) =>{
    const {name,batchNo,quantity,category,price,weight,AssignedEmployee} = req.body

    try {
        //this item variable stores the data of the document that we just created from the aysnc call to the databse 
        const  QASession = await QSession.create({name,batchNo,quantity,category,price,weight,AssignedEmployee})
        res.status(200).json(QASession)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}





//Update Information regarding an QASession in the inventoy 

const updateQASession = async(req,res)=>{
    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No item found for id:'+id})
    }

    const QASession  = await  QSession .findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!QASession ){
        return res.status(404).json({error:'No such Item'})
    }

    res.status(200).json(QASession )
}





//Delete an QASession  in the inventory 

const deleteQASession  = async(req,res)=>{
    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No item found for id:'+id})
    }


        const QASession  = await QSession .findOneAndDelete({_id:id})
       
        if(!QASession ){
            return res.status(404).json({error:'No such Item'})
        }
        res.status(200).json(QASession )
    
}




module.exports = {
    getQASessions ,
    getQASession ,
    createQASession ,
    deleteQASession ,
    updateQASession ,
}