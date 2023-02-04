import React, { useState } from 'react'
import axios from 'axios'
const Image = () => {

  const [image,setImage]=useState({myFile:""})
  const [umage,setUmage]=useState({myFile:""})

  const handleSubmit=async(e)=>{
    e.preventDefault()

    try{
      await axios.post("http://localhost:8000/image/uploads",image)
      const res=await axios.get("http://localhost:8000/image/find")
console.log(res)
      if(res.status==200){
        setUmage({...umage,myFile:res.data[0].myFile})
      }
console.log(umage)
    }catch(e){
      console.log(e)
    }
  }

  const handlUpload=async(e)=>{
const file=e.target.files[0]
const base64=await conertTobase64(file)
setImage({...Image,myFile:base64})

  }
  return (
    <form onSubmit={handleSubmit}> 
      <label>Hello</label>
        <input type="file" label="image" name="myFile" accept=".jpeg,.jpg,.png" onChange={handlUpload}/>
    
        <button type="submit">Submit</button>   


        <img src={umage.myFile} width={100}/> 
    </form>

  )
}

export default Image

function conertTobase64(file){
  return new Promise((res,rej)=>{
    const fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
      res(fileReader.result)
    }
    fileReader.onerror=(e)=>{
      rej(e)
    }
  })
}