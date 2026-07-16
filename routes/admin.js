const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../db");

router.post("/login", async (req, res) => {

    const { password } = req.body;

    try {

        const [rows] = await db.query(
            "SELECT * FROM admins LIMIT 1"
        );

        if (rows.length == 0) {
            return res.json({
                success:false,
                message:"ไม่พบ Admin"
            });
        }

        const admin = rows[0];

        const match = await bcrypt.compare(
            password,
            admin.password
        );

        if(!match){
            return res.json({
                success:false,
                message:"รหัสผ่านไม่ถูกต้อง"
            });
        }

        res.json({
            success:true,
            admin:{
                id:admin.id,
                username:admin.username
            }
        });

    } catch(err){
        console.log(err);

        res.status(500).json(err);
    }

});

module.exports = router;