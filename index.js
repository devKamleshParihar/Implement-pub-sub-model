const env = require('dotenv')
env.config({path:'./.env'})
const connection = require('./db')
const  express = require('express')
const { sendSnsMessageToSubscribers } = require('./snsService');
const { sendEmailToSubscribers } = require('./emailService');
const app = express()
const port  = process.env.PORT

function getSubscribersEmails(channelId, callback) {
    const query = `
      SELECT u.email
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      where s.channel_id = ${channelId}
    `;
  
    connection.query(query, [channelId], (err, results) => {
      if (err) {
        console.error('Error fetching subscribers:', err);
        return callback(err, null);
      }
  
      const emails = results.map((row) => row.email);
      callback(null, emails);
    });
  }

  
  const channelId = 5; // Replace with the actual channel ID you want to notify
  const subject = 'New Content Available!';
  const message = 'Hello! New content has been uploaded to your subscribed channel. Check it out now!';


  getSubscribersEmails(channelId, async (err, emails) => {
    if (err) {
      console.error('Failed to get email addresses:', err);
      return;
    }
  if (emails.length === 0) {
    console.log('No subscribers found for the channel.');
    return;
  }
  console.log(emails)
  
    await sendSnsMessageToSubscribers(emails, message);
  
    await sendEmailToSubscribers(emails, subject, message);
  
    // Close the MySQL connection after all notifications are sent
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err);
        return;
      }
      console.log('MySQL connection closed.');
    });
  });


app.listen(port,()=>{
    console.log(`Apllication running on port ${port}`);
})