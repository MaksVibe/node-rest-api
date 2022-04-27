const express = require("express");
const router = express.Router();
const Contacts = require("../../models/contacts");
const { validateAddedContact, validateUpdatedContact } = require("./validator");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateAddedContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.json({ contact });
  } catch (error) {
    res.json({
      status: "rejected",
      code: 400,
      message: "missing required name field",
    });
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ status: "rejected", message: "Not found" });
    }
    return res.json({
      status: "success",
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateUpdatedContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      res
    );
    return res.json({
      status: "success",
      message: "contact updated",
      contact: contact,
    });
  } catch (error) {
    next(error);
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
