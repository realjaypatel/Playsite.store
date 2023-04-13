const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MY_SENDGRID_KEY)
const msg = {
    to: 'ay22oct02@gmail.com', // Change to your recipient
    from: 'abhigame4u@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.log("lll");
        console.error(error)
    })
