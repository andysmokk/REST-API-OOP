const express = require("express");
const Contacts = require("../../model/contacts/index");
const router = express.Router();
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/index");

router.get("/", async (req, res, next) => {
  const contacts = await Contacts.listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contactById = await Contacts.getContactById(id);
  if (contactById) {
    return res.status(200).json(contactById);
  }
  res.status(404).json({ message: "Contact not found" });
});

router.post("/", addContactValidation, async (req, res, next) => {
  const newContact = await Contacts.addContact(req.body);
  return res.status(201).json(newContact);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const removedContact = await Contacts.removeContact(id);
  if (removedContact) {
    return res.status(200).json({ message: "Contact deleted" });
  }
  res.status(404).json({ message: "Contact Not found" });
});

router.put("/:id", updateContactValidation, async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await Contacts.updateContact(id, req.body);
  if (updatedContact) {
    return res.status(200).json(updatedContact);
  }
  res.status(404).json({ message: "Contact not found" });
});

module.exports = router;
