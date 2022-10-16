const sgMail = require("@sendgrid/mail");
const Email = require("./email");

/**
 * This is a method that is responsible for sending emails,
 * taking advantage of the capabilities that the sendGrid platform gives.
 * The email is sent asynchronously.
 * @param {Email} emailObj An object with all the information about the email that will be send,
 * like the receiver, the sender, the subject and the main body of the email
 */
const sendEmail = async function (emailObj) {
  //Inform sendGrid which API key will used
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(emailObj);
  sgMail
    .send({ to: emailObj.to, from: emailObj.from, subject: emailObj.subject, html: emailObj.html })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
