const mongoose=require("mongoose")

const connection=()=>{
    try{
        mongoose.connect(process.env.mongooseurl)
        console.log("connection with database successful")
    }catch(error){
        console.log("error while connecting to database")
    }
}

module.exports={connection}