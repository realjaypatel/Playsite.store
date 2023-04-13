const express = require("express");
const app = express();
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const config = require("dotenv").config();
let MY_SENDGRID_KEY = "SG.t5hmbjrsQOSXZF2ghrmkig.QxnFl9oMsFq429hVqs_0XMlQhsl5Un7FNMxtlXxf73o"
const port = 3000;
const transporter = nodemailer.createTransport(
    sendgridTransport({
    auth: {
    api_key: MY_SENDGRID_KEY,
    },
    })
);

e = [
    { email: "202051038@iiitvadodara.ac.in" },]


const htmlTemplate = require('./ht.js');
const emailslist = [
    {
    email: "contact@glownightgames.com",
    name: "Glownights games",
    },
    {
        email: "hello@gameanax.com",
        name: "gameanax.com",
    },
    {
        email: "info@thundergamestudio.com",
        name: "Thunder Games"
    },
    {
        email: "contact@underdogsthestudio.com",
        name: "under dogs game"
    },
    {
        email: "team@insanitycrew.com",
        name: "insanity crew games"
    },
    {
        email: "omnayastudios@gmail.com",
        name: "Omnaya studio"
    },
    {
        email: "contact@qtonzgames.com",
        name: "tonz games"
    }
];


function mailSender(email) {
    transporter
    .sendMail({
        to: email,
        from: "playsitestore@gmail.com",
        subject: "Let's Bring Your Work Online",
        html: htmlTemplate,
    })
    .then(() => {
        console.log("email sent to :" + email);
    })
    .catch((err) => {
        console.log(err, "sending mail to :" + email);
    });
}

e.forEach(element => {
    mailSender(element.email);
});