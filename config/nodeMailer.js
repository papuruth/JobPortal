import nodemailer from 'nodemailer';

const nodeMailerConfig = () => {
  // ===== Setting up NodeMailer ====
  const transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  };

  const transporter = nodemailer.createTransport(transport);

  transporter.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  return transporter;
}

export default nodeMailerConfig;