const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const ACCESS_TOKEN = "dy/4jcrJEt8LNDylaGBxk1fAxKAFD8gqO3nYX7Ci00fkcbganV2L9OstA636/A8JAieAgabwPycqr7vNwKuruDGIJAhF9Wf9sK1QguZrNwsRpzmkDHGlfZQp4VQafDrrwktcdi0+cQ1NLD54T62xsAdB04t89/1O/w1cDnyilFU=";

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
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
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

app.listen(3000, () => {
    console.log("Server : http://localhost:3000");
});
