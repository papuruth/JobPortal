const mail = require('../server');

exports.sendMail = function sendMail(req, res) {
  const {
    fullname,
    email,
    subject,
    message,
  } = req.body;
  const content = `name: ${fullname} \n email: ${email} \n message: ${message} `;

  const mailData = {
    from: `${fullname} <${email}>`,
    to: 'papuruth@gmail.com', // Change to email address that you want to receive messages on
    subject,
    text: content,
  };

  mail.transporter.sendMail(mailData, (err) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json({
        msg: 'success',
      });
    }
  });
};
