const Contact = require("../../model/contact/Contact");
const ObjectId = require("mongodb").ObjectId;

class Contacts {
  async getAllContacts() {
    const contacts = await Contact.find();
    return contacts;
  }

  async getContactById(contactId) {
    const id = ObjectId(contactId);
    const contact = await Contact.findOne({ _id: id });
    console.log(contact);
    return contact;
  }

  async addContact(body) {
    const contact = await Contact.create(body);
    return contact;
  }

  async removeContact(contactId) {
    const id = ObjectId(contactId);
    const removedContact = await Contact.findOneAndDeleted({ _id: id });
    return removedContact;
  }

  async updateContact(contactId, body) {
    const id = ObjectId(contactId);
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id },
      { ...body },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedContact;
  }
}

module.exports = Contacts;
