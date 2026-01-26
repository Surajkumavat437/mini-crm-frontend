const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.loginAdmin = async (req, res)=> {
    try{
        const {email, password} = req.body;

        const admin = await Admin.findOne({email});

        if(!admin) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = JWT.sign(
            {id: admin._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login successfull",
            token
        })

    } catch(error) {
        res.status(500).json({message: "Server error"});
    }
}

