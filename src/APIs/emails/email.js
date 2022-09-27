// This is the class that represents the email to be sent.
// It has as fields as much data as the sendGrid API needs to know.
class Email {
  #to;
  #from;
  #subject;
  #html;

  constructor(to, subject, html) {
    this.#to = to;
    this.#from = "dpmcomboard@gmail.com";
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
