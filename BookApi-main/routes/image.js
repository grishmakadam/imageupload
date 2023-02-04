const express = require('express')
const router = express.Router()

const Image=require('../models/image')

router.get("/find",async(req,res)=>{
    
    try{
        Image.find({_id:"63de2e60765cfe5ce45cfa04"}).then(data=>{
            return res.json(data)}).catch(e=>
                res.status(500).json({message:e.message}))
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/uploads",async(req,res)=>{
    const body=req.body
    try{
        const newImage=await Image.create(body)
        newImage.save();
        res.status(201).json({message:"upload successful"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports=router