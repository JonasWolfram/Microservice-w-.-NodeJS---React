const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { callbackPromise } = require("nodemailer/lib/shared");

const app = express();
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {});

app.post("/posts", (req, res) => {
  const { type, data } = req.body;

  if (type === "Post Created") {
  }

  if (type === "Comment Created") {
  }
});

app.listen(4002, () => {
  console.log("Listening on Port: 4002");
});
