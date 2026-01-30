const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* routes */
app.use("/api/projects", require("./routes/projectroutes"));
app.use("/api/clients", require("./routes/clientroutes"));
app.use("/api/contacts", require("./routes/contactroutes"));
app.use("/api/subscribers", require("./routes/subscriberoutes"));

/* test route */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* database */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* server */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
