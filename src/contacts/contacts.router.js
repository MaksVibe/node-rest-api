const express = require("express");
const { authorize } = require("../users/users.middleware");
const {
  validateAddedContact,
  validateUpdatedContact,
  validatePatch,
} = require("./contacts.validator");

const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("./contacts.controller");

const contactsRouter = express.Router();

contactsRouter.get("/", authorize(), getContacts);
contactsRouter.get("/:id", authorize(), getContact);
contactsRouter.post("/", authorize(), validateAddedContact, createContact);
contactsRouter.put("/:id", authorize(), validateUpdatedContact, updateContact);
contactsRouter.delete("/:id", authorize(), deleteContact);
contactsRouter.patch("/:id", authorize(), validatePatch, updateStatusContact);

module.exports = contactsRouter;
