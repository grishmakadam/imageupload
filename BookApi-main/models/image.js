const mongoose=require("mongoose")


const imageSchema=new mongoose.Schema({
    myFile:String
})

module.exports=mongoose.model('Image',imageSchema)