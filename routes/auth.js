const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login",async(req,res)=>{

    const {username,password}=req.body;

    // ดึงจาก MySQL
    const user={
        id:1,
        username:"admin",
        password:"$2b$10........",
        role:"admin"
    };

    if(username!=user.username){
        return res.status(401).json({
            message:"Username incorrect"
        });
    }

    const check = await bcrypt.compare(password,user.password);

    if(!check){
        return res.status(401).json({
            message:"Password incorrect"
        });
    }

    const token=jwt.sign({

        id:user.id,
        role:user.role

    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    });

    res.cookie("token",token,{
        httpOnly:true,
        secure:false
    });

    res.json({
        success:true
    });

});

module.exports=router;