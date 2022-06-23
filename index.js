const PORT = 8000;
const axios = require("axios");
const express = require("express");
const app = express();

const url =
  "https://037496ab-9790-46a7-a6d2-471c56681b14-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/highscores/collections/scores?page-size=10";

app.get("/", (req, res) => {
  res.json("Successfully connected to server!");
});

// make a request to DB for ALL scores available
app.get("/scores", (req, res) => {
  const options = {
    method: "GET",
    headers: {
      Accepts: "application/json",
      "X-Cassandra-Token":
        "AstraCS:TYpCuZIwXWWIhaAlFoFbTuQO:2cd20cdece4bbfcd30d939d663691902a5cd3f34d709da94a693f3a2eefd030f",
    },
  };

  axios(url, options)
    .then((response) => res.status(200).json(response.data))
    .catch((err) => res.status(500).json({ message: err }));
});

app.listen(PORT, () =>
  console.log(`The server is running successfully on PORT: ${PORT}`)
);

// 23:47
