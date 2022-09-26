// This is the class that represents the email to be sent.
// It has as fields as much data as the sendGrid API needs to know.
class Email {
  #to;
  #from;
  #subject;
  #text;
  #html;

  constructor(to, from, subject, text, html) {
    this.#to = to;
    this.#from = from;
    this.#subject = subject;
    this.#text = text;
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

  get text() {
    return this.#text;
  }

  get html() {
    return this.#html;
  }
}

module.exports = Email;
