const { ContactModel } = require("./contacts.model");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find({ owner: req.userId });
    res.json(contacts);
  } catch (error) {
    console.log(error.message);
  }
};
// getContact
const getContact = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    return res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

// getContactById
const getContactById = async (req, res, next) => {
  try {
    const contact = await ContactModel.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

// createContact
const createContact = async (req, res, next) => {
  try {
    const contact = await ContactModel.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.json({
      status: "rejected",
      code: 400,
      message: "missing required name field",
    });
    next(error);
  }
};

// deleteContact
const deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactModel.findByIdAndRemove(req.params.contactId);
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
};

// updateContact
const updateContact = async (req, res, next) => {
  try {
    const contact = await ContactModel.findByIdAndUpdate(
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
};

// updateStatusContact
const updateStatusContact = async (req, res, next) => {
  try {
    if (!req.body.favorite)
      return res.status(400).json({ message: "missing field favorite" });
    else {
      const upDateContact = await ContactModel.findByIdAndUpdate(
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
};

module.exports = {
  getContacts,
  getContact,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
