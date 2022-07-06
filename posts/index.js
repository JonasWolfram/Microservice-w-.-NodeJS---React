const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// Basic Set Up for the PostsServer Service
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Empty Object Posts
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// Async creation of a new Post
// 1. ID being created - 2. Title is being defined as incoming req.body
// 3. Object definition - 4. Post is emitted with Type Desciption
// 5. Return of Object with HTTP-Status Code
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

// Listens to Events from the Event Bus
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on Port: 4000 || Posts Server");
});
