const fs = require("fs").promises;
const path = require("path");
const {v4: uuid} = require('uuid');

const contactsPath = path.format({
  dir: "./db",
  base: "contacts.json",
});

async function listContacts() {
  try {
    const contactsBuffer = await fs.readFile(contactsPath);
    return JSON.parse(contactsBuffer.toString());
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const constacts = await listContacts();
    return constacts.find(({ id }) => id === contactId);
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts).toString()
    );
    return listContacts();
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    contacts.push({
      id: uuid(),
      name,
      email,
      phone,
    });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return listContacts();
  } catch (error) {
    throw error;
  }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
}