const express=require('express')
const router=express.Router()
const User=require("../models/user")
const jwt=require('jsonwebtoken')


const createToken=async(email)=>{
    return await jwt.sign({email},process.env.SECRET,{expiresIn:'1d'})
}
router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body

    try{
    const user=await User.signup(name,email,password)
    const token=await createToken(email)
    res.json({email,token})
    }catch(e){
        res.status(400).json({error:e.message})
    }

})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.login(email,password)
      
        const token=await createToken(email)
        res.json({email,token})
    }catch(e){
        res.status(400).json({error:e.message})
    }
})




module.exports=router