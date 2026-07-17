const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();

const db = require("./db");
const bcrypt = require("bcrypt");
const adminRoute = require("./routes/admin");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", adminRoute);
app.use(express.static(__dirname));

const userIds = [
    "Uxxxxxxxxxxxxxxxxxxxx",
    "Uyyyyyyyyyyyyyyyyyyyy"
];

// const userIds = rows.map(row => row.line_user_id);


const flexBooking = require("./messages/flexBooking");

const TOKEN_MESSAGE = "zuorICwzxh8LvoLghb7qBykm2xyJ9BrkuP0p3QoiVIAjGKH60JoVP3UKmLVjnZQQyDM1uKJM+SQ8o+Do/2plchvzZXMliYUFh0uAuk+o65BH9yTzZXlaMrkXkEkMj+T/tgWH9qJqWIYXIJ993XWInAdB04t89/1O/w1cDnyilFU=";

const TOKEN_BROADCAST = "zuorICwzxh8LvoLghb7qBykm2xyJ9BrkuP0p3QoiVIAjGKH60JoVP3UKmLVjnZQQyDM1uKJM+SQ8o+Do/2plchvzZXMliYUFh0uAuk+o65BH9yTzZXlaMrkXkEkMj+T/tgWH9qJqWIYXIJ993XWInAdB04t89/1O/w1cDnyilFU=";


// ===============================
// 1. ส่งข้อความธรรมดา (Push)
// ===============================


app.post("/send", async (req, res) => {

    const { to, message } = req.body;
     console.log("Request:", req.body);

    if (!to || !message) {
        return res.status(400).json({
            success: false,
            message: "กรุณาระบุ User ID และข้อความ"
        });
    }

    try {

        await axios.post(
            "https://api.line.me/v2/bot/message/push",
            {
                to,
                messages: [
                    {
                        type: "text",
                        text: message
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN_MESSAGE}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            success: true,
            message: "ส่งข้อความสำเร็จ"
        });

    } catch (err) {

        console.log(err.response?.data);

        res.status(500).json({
            success: false,
            error: err.response?.data || err.message
        });

    }

});



// ===============================
// 2. Broadcast
// ===============================


app.post("/broadcast", async (req, res)=>{

    const { message } = req.body;


    if(!message){

        return res.status(400).json({
            success:false,
            message:"กรุณาใส่ข้อความ"
        });

    }


    try {


        await axios.post(
            "https://api.line.me/v2/bot/message/broadcast",
            {
                messages:[
                    {
                        type:"text",
                        text:message
                    }
                ]
            },
            {
                headers:{
                    Authorization:`Bearer ${TOKEN_BROADCAST}`,
                    "Content-Type":"application/json"
                }
            }
        );


        res.json({
            success:true,
            message:"Broadcast สำเร็จ"
        });


    }catch(err){

        console.log(err.response?.data);

        res.status(500).json({
            success:false,
            error:err.response?.data
        });

    }

});




// ===============================
// 2. multicast
// ===============================


app.post("/multicast", async (req, res)=>{

    const { userIds } = req.body;

    if (!userIds || userIds.length === 0) {
        return res.status(400).json({
            success: false,
            message: "ไม่พบ User ID"
        });
    }

    try {

        await axios.post(
       "https://api.line.me/v2/bot/message/multicast",
       {
        to: userIds,
        messages: [flexBooking]
      },
      {
        headers: {
            Authorization: `Bearer ${TOKEN_MESSAGE}`,
            "Content-Type": "application/json"
        }
     }
    );

    res.json({
            success:true,
            message:"Broadcast สำเร็จ"
        });


    }catch(err){

        console.log(err.response?.data);

        res.status(500).json({
            success:false,
            error:err.response?.data
        });


    }

});
// ===============================
// เปลี่ยนรหัสแอดมิน
// ===============================

app.post("/api/admin/change-password", async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    const [rows] = await db.query(
        "SELECT * FROM admins WHERE id=1"
    );

    if(rows.length === 0){
        return res.json({
            success:false,
            message:"ไม่พบข้อมูล Admin"
        });
    }

    const admin = rows[0];

    const match = await bcrypt.compare(
        oldPassword,
        admin.password
    );

    if(!match){

        return res.json({
            success:false,
            message:"รหัสผ่านเดิมไม่ถูกต้อง"
        });

    }

    const hash = await bcrypt.hash(
        newPassword,
        10
    );

    await db.query(
        "UPDATE admins SET password=? WHERE id=?",
        [hash, admin.id]
    );

    res.json({
        success:true
    });

});

// ===============================
// ส่งข้อมูลจองลูกค้า ไป Database
// ===============================
            app.post("/booking", async (req,res)=>{

            const connection = await db.getConnection();

            try {

            await connection.beginTransaction();


            const {

            booking_id,
            client_line_id,
            client_id,
            name,
            phone,
            address,
            google_map_link,

            massager_line_id,

            appointment_date,
            appointment_time,
            service_type,
            course_duration,
            package_name,
            guests_count,
            pregnancy_weeks,
            massage_level,
            pets,
            client_note

            } = req.body;



            // แปลงค่า massager

            const finalMassagerId =
            (
            massager_line_id === "" ||
            massager_line_id === "none"
            )
            ? null
            : massager_line_id;



            console.log("DATA:", req.body);



            // INSERT CLIENT

            await connection.execute(

            `
            INSERT INTO clients
            (
            line_user_id,
            client_id,
            name,
            phone,
            address,
            google_map_link,
            massage_level,
            pets_info,
            notes
            )

            VALUES (?,?,?,?,?,?,?,?,?)

            ON DUPLICATE KEY UPDATE

            name=?,
            phone=?,
            address=?

            `,

            [

            client_line_id,
            client_id,
            name,
            phone,
            address,
            google_map_link,
            massage_level,
            pets,
            client_note,

            name,
            phone,
            address

            ]

            );




            // INSERT BOOKING

            await connection.execute(

            `
            INSERT INTO bookings
            (
            booking_id,
            client_line_id,
            massager_line_id,
            appointment_date,
            appointment_time,
            service_type,
            course_duration,
            package_name,
            guests_count,
            pregnancy_weeks,
            address,
            google_map_link,
            massage_level,
            pets,
            client_note,
            is_repeated_request,
            booking_status
            )

            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)

            `,

            [

            booking_id,
            client_line_id,
            finalMassagerId,

            appointment_date,
            appointment_time,

            service_type,
            course_duration,
            package_name,

            guests_count,
            pregnancy_weeks,

            address,
            google_map_link,

            massage_level,
            pets,

            client_note,

            false,
            "pending_details"

            ]

            );



            await connection.commit();



            res.json({

            success:true,
            message:"บันทึกสำเร็จ"

            });



            }catch(err){


            await connection.rollback();

            console.error(err);


            res.status(500).json({

            success:false,
            message:err.message

            });


            }finally{


            connection.release();


            }

});
// ===============================
// START SERVER
// ===============================

app.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
