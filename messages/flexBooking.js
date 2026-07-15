module.exports = function (data) {
  return {
  type: "flex",
  altText: "💸 งานเข้า",
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "📋 รายละเอียดการจอง",
          weight: "bold",
          size: "xl"
        },
        {
          type: "separator",
          margin: "md"
        },
        {
          type: "text",
          text: "👤 ลูกค้า : สมชาย ใจดี",
          wrap: true
        },
        {
          type: "text",
          text: "📞 เบอร์โทร : 081-234-5678",
          wrap: true
        },
        {
          type: "text",
          text: "💰 ราคา : 900 บาท",
          weight: "bold",
          wrap: true
        }
      ]
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          style: "primary",
          color: "#FFB6C1",
          action: {
            type: "message",
            label: "✅ สนใจรับงาน",
            text: "รับงาน"
          }
        }
      ]
    }
  }
}
};