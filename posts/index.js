const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// Server implemetation für Post-Server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Leeres Post Objekt
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// Async Erstellung
// 1. ID wird erstellt - 2. Titel wird definiert als: req.body
// 3. Objekt Definition - 4. Post Objekt wird bereitgestellt mit Typen Bezeichnung
// 5. Return des Objektes mit HTTP-Typ
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

// Listens für Events vom Event Bus
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on Port: 4000 || Posts Server");
});
