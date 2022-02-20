const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
// process.env.SECRET_KEY;
// process.env.NODE_ENV;

const contactsRouter = require("./routes/api/contacts");

const app = express();
// const PORT = 3000;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.listen(PORT, () => {
//   console.log("Server listen port", PORT);
// });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
