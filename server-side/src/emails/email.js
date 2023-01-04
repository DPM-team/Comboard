/**
 * This is the class that represents the email to be sent.
 * It has as fields as much data as the sendGrid API needs to know.
 */
class Email {
  #to;
  #from;
  #subject;
  #html;

  /**
   *
   * @param {string} to The recipient's email
   * @param {string} from The sender's email
   * @param {string} subject The subject of the email to be sent.
   * @param {string} html The main body of the email, in the form of html code, thus giving possibilities for better content.
   * @returns {Email} An email instance is returned
   */
  constructor(to, from, subject, html) {
    this.#to = to;
    this.#from = from;
    this.#subject = subject;
    this.#html = html;
  }

  get to() {
    return this.#to;
  }

  get from() {
    return this.#from;
  }

  get subject() {
    return this.#subject;
  }

  get html() {
    return this.#html;
  }
}

module.exports = Email;
