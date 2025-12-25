const userschema = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const login = async (req, res) => {
    const { name, password } = req.body
    //check name exists in database or not
    const nameexists = await userschema.findOne({ name })
    console.log(name)
    if (nameexists) {
        //check password is same as enteerd by user 
        const ispasswordmatch = await bcrypt.compare(password, nameexists.password)
        if (ispasswordmatch) {
            //create accesstocken using jwt
            const accesstoken = jwt.sign({
                userid: nameexists._id,
                username: nameexists.name,
            }, process.env.jwtkey, {
                expiresIn: "30m"
            })
            return res.status(200).json({
                success: true,
                message: "login successfully now u have 30 minutes enjoy",
                accesstoken
            })
        }
        return res.status(400).json({
            status: false,
            message: "invalid password "
        })
    }
    return res.status(400).json({
        status: false,
        message: "user name not found in database "
    })
}
const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        //check user must be unique
        const checkunique = await userschema.findOne({ $or: [{ name }, { email }] })
        if (checkunique) {
            res.status(400).json({
                message: "username and email already exits "
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpsswd = await bcrypt.hash(password, salt);
        const newuser = new userschema({ name, email, password: hashedpsswd })
        await newuser.save()
        res.status(201).json({
            message: "user regitered successfully"
        })
    } catch (e) {
        console.error(e)
        res.status(400).json({
            success: false,
            message: "error while entering user details into database"
        })
    }
}
const changepassword = async (req, res) => {
    try {
        const { name, newpassword } = req.body;

        // Print inputs
        console.log("Received name:", name);
        console.log("Received new password:", newpassword);

        // 1. Fetch user from DB (IMPORTANT: await)
        const finduser = await userschema.findOne({ name });

        if (!finduser) {
            return res.status(400).json({
                message: "Name does not exist in database"
            });
        }

        console.log("User found:", finduser);

        // 2. Compare old and new password
        const psswdsame = await bcrypt.compare(newpassword, finduser.password);

        if (psswdsame) {
            return res.status(400).json({
                message: "New password cannot be same as the old password"
            });
        }

        // 3. Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedpsswd = await bcrypt.hash(newpassword, salt);

        // 4. Save new password
        finduser.password = hashedpsswd;
        await finduser.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            error
        });
    }
}



module.exports = {
    login,
    register, 
    changepassword
}