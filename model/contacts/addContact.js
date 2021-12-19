const fs = require("fs/promises");
const crypto = require("crypto");
const { readContent } = require("./readContent");
const { contactsPath } = require("./readContent");

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };

  const existingContact = contacts.find((contact) => {
    if (contact.name === name) {
      return contact;
    }
    return null;
  });

  if (existingContact?.email === newContact.email) {
    console.log(`Contact with this email: ${newContact.email} already exists`);
    return;
  }

  if (existingContact?.phone === newContact.phone) {
    console.log(`Contact with this phone: ${newContact.phone} already exists`);
    return;
  }
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  addContact,
};
