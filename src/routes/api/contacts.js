const express = require("express");
const router = express.Router();
const {
  validateAddedContact,
  validateUpdatedContact,
  validatePatch,
} = require("./validator");

const { UserModel } = require("../../db/contacts.model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await UserModel.find();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await UserModel.findById(req.params.contactId);
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
    const contact = await UserModel.create(req.body);
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
    const contact = await UserModel.findByIdAndRemove(req.params.contactId);
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
    const contact = await UserModel.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true,
      }
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

router.patch("/:contactId", validatePatch, async (req, res, next) => {
  try {
    if (!req.body.favorite)
      return res.status(400).json({ message: "missing field favorite" });
    else {
      const upDateContact = await UserModel.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        {
          new: true,
        }
      );
      res.json(upDateContact);
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    console.log(error.message);
  }
});

module.exports = router;
