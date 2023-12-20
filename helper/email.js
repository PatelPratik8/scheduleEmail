const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.EMAIL_KEY)
const from = process.env.EMAIL_FROM


function sendEmail(scheduleEmail){
  
const msg = {
  to: scheduleEmail.to,
  from,
  subject: scheduleEmail.subject,
  text: scheduleEmail.emailText
}

return sgMail
  .send(msg)
  .then((response) => {
    scheduleEmail.status = "success"
    scheduleEmail.save();
  })
  .catch((error) => {
    console.log(JSON.stringify(error));
    scheduleEmail.status = "rejected"
    scheduleEmail.save();
  })
}

module.exports = sendEmail;