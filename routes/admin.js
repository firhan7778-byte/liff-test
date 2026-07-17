const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../db");

router.post("/login", async(req,res)=>{

    const {password}=req.body;


    const [adminRows] = await db.execute(
        `
        SELECT *
        FROM admins
        LIMIT 1
        `
    );


    const admin = adminRows[0];


    const check = await bcrypt.compare(
        password,
        admin.password
    );


    if(!check){
        return res.json({
            success:false,
            message:"รหัสผ่านไม่ถูกต้อง"
        });
    }


    req.session.admin = {
        id:admin.id,
        username:admin.username,
        login:true
    };


    res.json({
        success:true
    });

});



router.get("/profile", async(req,res)=>{


    const adminId = req.session.admin.id;


    const [profileRows] = await db.execute(
        `
        SELECT id,username
        FROM admins
        WHERE id=?
        `,
        [adminId]
    );


    res.json({
        success:true,
        admin:profileRows[0]
    });


});


// =====================
// ตรวจสอบ Session
// =====================
router.get("/check",(req,res)=>{


    console.log(req.session);


    if(req.session.admin){


        return res.json({

            success:true,

            admin:req.session.admin

        });


    }


    res.json({

        success:false

    });


});



module.exports = router;