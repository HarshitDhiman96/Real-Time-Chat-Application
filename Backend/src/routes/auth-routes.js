const express=require('express')
const routes=express.Router()
const auth=require('../middleware/changpswd')
const {login,register,changepassword,homepage}=require('../controllers/auth-controller')

routes.post('/login',login)
routes.post('/register',register)
routes.post('/changepassword',auth,changepassword)

module.exports= routes