const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");
const fs = require("fs");
const Web3 = require("web3");

// Initialize express app
const app = express();

// Apply middleware
app.use(cors()); // Enables CORS
app.use(bodyParser.json()); // Parses incoming requests with JSON payloads

// Connection URL
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend Application!");
});

app.post("/create-new-teacher", (req, res) => {
  console.log("POST /create-new-teacher", req.body);
  try {
    const { teacher } = req.body;
    const db = client.db('sierra-sih23');
    const collection = db.collection("teachers");
    collection.insertOne(teacher);
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// Listen on a port
const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
