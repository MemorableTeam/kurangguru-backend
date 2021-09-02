const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    port:process.env.TEST_MAIL_PORT,
    host:`${process.env.TEST_MAIL_HOST}`,
    auth:{
        user:`${process.env.TEST_MAIL_USER}`,
        pass:`${process.env.TEST_MAIL_PASSWORD}`,
    },
 /*    secure:false */
})

module.exports = transporter