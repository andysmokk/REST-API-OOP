const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.resolve("./db/contacts.json");

class Contacts {
  async readContent() {
    const content = await fs.readFile(contactsPath);
    const contacts = JSON.parse(content);
    return contacts;
  }

  async listContacts() {
    return await this.readContent();
  }

  async getContactById(contactId) {
    const contacts = await this.readContent();
    const [contact] = contacts.filter((contact) => contact.id === contactId);
    return contact;
  }

  async addContact({ name, email, phone }) {
    const contacts = await this.readContent();
    const newContact = { name, email, phone, id: crypto.randomUUID() };

    const existingContact = contacts.find((contact) => {
      if (contact.name === name) {
        return contact;
      }
      return null;
    });

    if (existingContact?.email === newContact.email) {
      console.log(
        `Contact with this email: ${newContact.email} already exists`
      );
      return;
    }

    if (existingContact?.phone === newContact.phone) {
      console.log(
        `Contact with this phone: ${newContact.phone} already exists`
      );
      return;
    }
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

  async removeContact(contactId) {
    const contacts = await this.readContent();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const [removedContact] = contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    }

    return null;
  }

  async updateContact(contactId, body) {
    const contacts = await this.readContent();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const updatedContact = {
        id: contactId,
        ...contacts[contactIndex],
        ...body,
      };
      contacts[contactIndex] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return updatedContact;
    }
    return null;
  }
}

module.exports = new Contacts();
