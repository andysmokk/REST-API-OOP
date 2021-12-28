const Contacts = require("../../model/contacts/index");

const getAllContact = async (req, res, next) => {
  const contacts = await Contacts.listContacts();
  res.status(200).json(contacts);
};

module.exports = getAllContact;
