const Contact = require("../../model/contact/Contact");

class Contacts {
  async getAllContacts() {
    const contacts = await Contact.find();
    return contacts;
  }
}

module.exports = Contacts;
