const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, attachmentPath) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: EMAIL_FROM,
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: "attachment.pdf", // Change this to the actual file name
        path: attachmentPath,
      },
    ],
  };
  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
