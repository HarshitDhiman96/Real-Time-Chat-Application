require('dotenv').config()
const express=require('express')
const db =require('../src/database/db')
const authroutes=require('../src/routes/auth-routes')

//creating express app
const app=express()


//connection with database
db.connection()

//middleware
app.use(express.json())

//routes
app.use('/chatapp',authroutes)


//port for running the server
app.listen(process.env.port,()=>{
    console.log(`server is running at ${process.env.port}`)
})