const Contacts = require("../../controllers/contacts/Contacts");

const contacts = new Contacts();

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contactById = await contacts.getContactById(id);
  if (contactById) {
    return res.status(200).json(contactById);
  }
  res.status(404).json({ message: "Contact not found" });
};

module.exports = getContact;
