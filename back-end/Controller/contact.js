const contacts = require("../model/Contacts");

const getContacts = async (req, res) => {
  try {
    const contact = await contacts.find();
    res.status(200).json(contact);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    console.log("req.body", req.body.data);
    const contact = await contacts.find({ phone: req.body.phone });
    if (contact.length > 0) throw Error("contact exists already!!");
    const newContact = contacts.create({
      name: req.body.name,
      phone: req.body.phone,
      user: req.user._id,
    });
    if (!newContact) throw Error("Something went wrong!!!");
    res.status(200).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contact = await contacts.findById(req.params.id);
    if (!contact) throw Error("Something went wrong");
    const deletecontact = await contacts.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contact = await contacts.findById(req.params.id);
    if (!contact) throw Error("Something went wrong");
    const updatecontact = await contacts.findByIdAndUpdate(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
};
