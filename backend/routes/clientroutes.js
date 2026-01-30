const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// ADD client
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE client ✅
router.put("/:id", async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE client ✅
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;