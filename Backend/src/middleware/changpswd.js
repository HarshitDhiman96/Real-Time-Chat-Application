const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    //authheader mai user ki bohot sari details jati hai usme se authorization wali details(token in postman )  chaiye hame isliye ye likha hai 
    const authHeader = req.headers["authorization"]
    console.log(authHeader);
    //token bohot bada hota hai string ki form mai toh hum uss split karke uska 2nd wala hisssa use karre hai authoprisation ke liye 
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(400).json({
            message: "no token provided please login first then try again"
        })
    }
    try {
        const decodedTokenInfo=jwt.verify(token,process.env.jwtkey)
        console.log(decodedTokenInfo)
        req.userinfo=decodedTokenInfo
        next();
    } catch (e) {
        return res.status(400).json({
            message: "no token provided error"
        })
    }
}
module.exports=auth