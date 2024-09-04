const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const snsClient = new SNSClient({ apiVersion: '2010-03-31' })

async function sendSnsMessageToSubscribers(emails, message) {
    const promises = emails.map(async (email) => {
      const params = {
        Message: message,
        Subject: 'Notification from Your App',
        TopicArn: process.env.TOPIC_ARN, // Replace with your SNS Topic ARN
      };
  
      try {
        const command = new PublishCommand(params);
        const result = await snsClient.send(command);
        console.log(`SNS message sent to ${email}:`, result.MessageId);
      } catch (error) {
        console.error(`Error sending SNS message to ${email}:`, error);
      }
    });
    await Promise.all(promises)
  }

module.exports = { sendSnsMessageToSubscribers };
