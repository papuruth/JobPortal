const mail = require('../server');

exports.sendMail = function (req, res, next) {
    const {fullname, email, subject, message} = req.body
    const content = `name: ${fullname} \n email: ${email} \n message: ${message} `

    var mailData = {
        from: fullname +' <' + email + '>',
        to: 'papuruth@gmail.com',  //Change to email address that you want to receive messages on
        subject: subject,
        text: content
    }

    mail.transporter.sendMail(mailData, (err, data) => {
        if (err) {
            console.log(err.message)
            res.json(err.message)
        } else {
            console.log(data)
            res.json({
                msg: 'success'
            })
        }
    })
}