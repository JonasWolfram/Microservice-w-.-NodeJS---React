const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(
    `Event Reiceived - Distrubuting Event: <<${req.body.type}>> to Services`
  );

  // Event are getting distributed to single Services with a Error Catch Methode
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message + " _ Port: 4000 || Posts Server");
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message + " _ Port: 4001 || Comments Server");
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message + " _ Port: 4002 || Query Server");
  });
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on Port: 4005 || Event Bus Server");
});
