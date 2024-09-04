const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport for Gmail
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,//Replace with your service provider like gmail
  auth: {
    user:process.env.EMAIL , // Your Gmail address
    pass:process.env.PASS , // Your App Password (not your Gmail password)
  },
});

async function sendEmailToSubscribers(emails, subject, message) {
    const promises = emails.map(async (email) => {
      const mailOptions = {
        from: process.env.FROM,
        to: email,
        subject: subject,
        text: message,
      };
  
      try {
        const result = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}:`, result.messageId);
      } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
      }
    });
  
    await Promise.all(promises);
  }
  
  module.exports = { sendEmailToSubscribers };