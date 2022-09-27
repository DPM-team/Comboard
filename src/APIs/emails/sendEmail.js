const sgMail = require("@sendgrid/mail");
const Email = require("./email");

/**
 * This is a method that is responsible for sending emails,
 * taking advantage of the capabilities that the sendGrid platform gives.
 * The email is sent asynchronously.
 * @param {Email} emailObj An object with all the information about the email that will be send,
 * like the receiver, the sender, the subject and the main body of the email
 */
const sendEmail = function (emailObj) {
  //Inform sendGrid which API key will used
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(emailObj)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
