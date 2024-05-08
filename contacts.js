import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw new Error("Не вдалося прочитати список контактів");
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) ?? null;
  } catch (error) {
    throw new Error("Не вдалося прочитати список контактів");
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((contact) => contact.id !== contactId);

    if (newContacts.length !== contacts.length) {
      await fs.writeFile(
        contactsPath,
        JSON.stringify(newContacts, undefined, 2)
      );
      return contacts.find((contact) => contact.id === contactId);
    }

    return null;
  } catch (error) {
    throw new Error("Не вдалося видалити контакт");
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const contacts = JSON.parse(data);

    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
    };

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, newContact], undefined, 2)
    );

    return newContact;
  } catch (error) {
    throw new Error("Не вдалося додати контакт");
  }
}

export default { listContacts, getContactById, removeContact, addContact };
