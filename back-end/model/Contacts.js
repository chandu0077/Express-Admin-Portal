const mongoose = require("mongoose");
const User = require("./User");

const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    phone: {
      type: String,
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"],
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Contacts", contactsSchema);
