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
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("sierra-sih23"); // Replace with your database name
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

connectToMongoDB();

// Define a simple route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend Application!");
});

app.post("/create-new-teacher", (req, res) => {
  console.log("POST /create-new-teacher", req.body);
  try {
    const { teacher } = req.body;
    const db = client.db("sierra-sih23");
    const collection = db.collection("teachers");
    collection.insertOne(teacher);
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.post("/add-new-material", (req, res) => {
  console.log("POST /add-new-material", req.body);
  try {
    const { material } = req.body;
    const db = client.db("sierra-sih23");
    const collection = db.collection("sharing");
    collection.insertOne(material);
    res.status(200).send({ status: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false });
  }
});

app.get("/get-all-materials", async (req, res) => {
  console.log("POST /get-all-materials", req.body);
  try {
    console.log("Connected to mongo");
    const mats = await db.collection("sharing").find({}).toArray();
    res.status(200).json({ status: true, data: mats });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false });
  }
});

// Listen on a port
const PORT = process.env.PORT || 3070;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
