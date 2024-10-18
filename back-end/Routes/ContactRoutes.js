const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../Controller/contact')

const verify = require("../middleware/privateRoute");

router.get("/", verify, getContacts);
router.post("/", verify, createContact);

router.delete("/:id", verify, deleteContact);

router.put("/:id", verify, updateContact);

module.exports = router;
