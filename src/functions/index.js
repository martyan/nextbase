const path = require('path')
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const next = require('next')
const admin = require('firebase-admin')
admin.initializeApp()

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev,
    conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
})
const handle = app.getRequestHandler()

exports.next = functions.https.onRequest((req, res) => {
    console.log('File: ' + req.originalUrl) // log the page.js file that is being requested
    return app.prepare().then(() => handle(req, res))
})


/*
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
})

exports.sendWelcomeEmail = functions.auth.user().onCreate(async (user) => {
    if(!user.email) return null

    const mailOptions = {
        from: '"Nextbase" <noreply@noreply.com>',
        to: user.email
    }

    mailOptions.subject = 'Welcome to Nextbase'
    mailOptions.text = 'Thanks for joining Nextbase. This is demonstrational email. You will receive no spam from us :)'

    try {
        await mailTransport.sendMail(mailOptions)
    } catch(error) {
        console.error('There was an error while sending the email:', error)
    }

    return null
})

//add uploaded img to db
exports.addUploadedImgToDB = functions.storage.object().onFinalize((object) => {
    const imgData = {
        bucket: object.bucket,
        path: object.name
    }

    return admin.firestore().collection('images').add(imgData)
})
*/
