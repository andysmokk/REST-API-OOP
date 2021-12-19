const fs = require("fs/promises");
const { readContent } = require("./readContent");
const { contactsPath } = require("./readContent");

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex !== -1) {
    const [removedContact] = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  }

  return null;
};

module.exports = {
  removeContact,
};
