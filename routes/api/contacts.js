const express = require("express");
// const Contacts = require("../../controllers/contacts/Contacts");
const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require("../../repository/contacts");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/index");

// const contacts = new Contacts();

const router = express.Router();

router.route("/").get(getContacts);
router.route("/:id").get(getContact);
router.route("/").post(addContactValidation, addContact);
router.route("/:id").delete(removeContact);
router.route("/:id").put(updateContactValidation, updateContact);

module.exports = router;
