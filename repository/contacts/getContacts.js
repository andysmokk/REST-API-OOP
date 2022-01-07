const Contacts = require("../../controllers/contacts/Contacts");

const contacts = new Contacts();

const getContacts = async (req, res, next) => {
  const allContacts = await contacts.getAllContacts();
  res.status(200).json(allContacts);
};

module.exports = getContacts;
