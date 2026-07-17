const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../db");


router.post("/login", async(req,res)=>{

    try{

        const {password} = req.body;


        // ดึงรหัส admin จาก database
        const [rows] = await db.execute(
            `
            SELECT *
            FROM admins
            LIMIT 1
            `
        );


        if(rows.length === 0){

            return res.json({
                success:false,
                message:"ไม่พบ Admin"
            });

        }


        const admin = rows[0];


        // ตรวจรหัส
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



        res.json({

            success:true

        });



    }catch(err){

        console.error(err);

        res.status(500).json({

            success:false,
            message:"Server Error"

        });

    }


});


module.exports = router;