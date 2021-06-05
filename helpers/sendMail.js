const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    port:process.env.MAIL_PORT,
    host:`${process.env.MAIL_HOST}`,
    auth:{
        user:`${process.env.MAIL_USER}`,
        pass:`${process.env.MAIL_PASSWORD}`,
    },
    secure:true
})

module.exports = transporter