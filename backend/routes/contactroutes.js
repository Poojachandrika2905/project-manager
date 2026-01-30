const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Contact saved" });
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
