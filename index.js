const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

const url = process.env.URL;

app.get("/", (req, res) => {
  res.json("Successfully connected to server!");
});

// make a GET request to DB for ALL scores available
app.get("/scores", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.ASTRA_TOKEN,
    },
  };

  axios(`${url}?page-size=10`, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

// make a POST request to DB to store scores from the front-end
app.post("/postscore", (req, res) => {
  const testData = {
    username: "Tron",
    score: 50,
  };

  const options = {
    method: "POST",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token": process.env.ASTRA_TOKEN,
      "Content-Type": "application/json",
    },
    data: testData,
  };
  axios(`${url}`, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.listen(PORT, () =>
  console.log(`The server is running successfully on PORT: ${PORT}`)
);

// 32:11
