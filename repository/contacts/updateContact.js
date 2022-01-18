const Contacts = require("../../controllers/contacts/Contacts");

const contacts = new Contacts();

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await contacts.updateContact(id, req.body);
  if (updatedContact) {
    return res.status(200).json({ message: "Contact updated" });
  }
  res.status(404).json({ message: "Contact not found" });
};

module.exports = updateContact;
