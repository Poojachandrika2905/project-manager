const express = require("express");
const router = express.Router();
const Subscriber = require("../model/Subscriber");

// ADD subscriber
router.post("/", async (req, res) => {
  try {
    const subscriber = new Subscriber(req.body);
    await subscriber.save();
    res.status(200).json(subscriber);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all subscribers (Admin view)
router.get("/", async (req, res) => {
  const subscribers = await Subscriber.find();
  res.json(subscribers);
});

// ✅ DELETE ALL subscribers (ONE-TIME CLEAN)
router.delete("/", async (req, res) => {
  await Subscriber.deleteMany({});
  res.json({ message: "All subscribers deleted" });
});

module.exports = router;
