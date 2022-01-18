const Contacts = require("../../controllers/contacts/Contacts");

const contacts = new Contacts();

const addContact = async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);
  return res.status(201).json(newContact);
};

module.exports = addContact;
