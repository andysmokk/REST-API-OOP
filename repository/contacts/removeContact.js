const Contacts = require("../../controllers/contacts/Contacts");

const contacts = new Contacts();

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const removedContact = await contacts.removeContact(id);
  if (removedContact) {
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Contact Not found" });
};

module.exports = removeContact;
