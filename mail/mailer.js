const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require("nodemailer");
const config = require('dotenv').config();

const emailList = require('emails.json');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.MY_API_KEY
    }
}));



emailList.forEach(element => {
    console.log(element);
});
exports.mailer = (req, res, next) => { 
    transporter.sendMail({
        to: email,
        from: "palysitestore@gmail.com",
        subject: "thx for signup",
        html: '<h1>Thank You</h1>'
    })
        .then(() => {
            console.log("email sent");
            process.exit(0);
        }).catch(err => {
            console.log(err);
        });
}
