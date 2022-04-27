const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () =>
  await fs.readFile(contactsPath).then(data => JSON.parse(data));

const getContactById = async contactId =>
  await fs
    .readFile(contactsPath)
    .then(data => JSON.parse(data).find(contact => contact.id === contactId));

const removeContact = async contactId => {
  const user = await getContactById(contactId);
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    contact => String(contact.id) !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return user;
};

const addContact = async body => {
  const user = {
    id: uuid(),
    ...body,
  };
  const contacts = await listContacts();
  contacts.push(user);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return user;
};

const updateContact = async (contactId, body, res) => {
  const user = await getContactById(contactId);
  if (!body.name || !body.email || !body.phone) {
    return res.status(400).json({ message: "missing feilds" });
  }
  Object.assign(user, body);
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(
    contact => String(contact.id) !== String(contactId)
  );
  updatedContacts.push(user);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return user;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
