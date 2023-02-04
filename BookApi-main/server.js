require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlparser:true})

const db=mongoose.connection

db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('Database connected'))
app.use(express.json({ limit: '50mb' }))
app.use(cors())
// app.use(function (req, res, next) {
//     //Enabling CORS
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
//       next();
//     });
const bookRouter=require('./routes/books')
const userRouter=require('./routes/users')
const imageRouter=require('./routes/image')
app.use('/books',bookRouter)
app.use('/user',userRouter)
app.use('/image',imageRouter)
app.listen(8000,()=>console.log('server started'))