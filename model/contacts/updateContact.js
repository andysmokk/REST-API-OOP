const fs = require("fs/promises");
const { readContent } = require("./readContent");
const { contactsPath } = require("./readContent");

const updateContact = async (contactId, body) => {
  const contacts = await readContent();
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
};

module.exports = {
  updateContact,
};
