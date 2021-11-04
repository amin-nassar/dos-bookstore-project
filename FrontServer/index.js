// Node Module
const express = require("express");
const fetch = require("node-fetch-commonjs");

// Servers' PORTs
const PORT_NUMBER = process.env.FRONT_PORT || 8080;
const CATALOG_PORT = process.env.CATALOG_PORT || 3030;
const ORDER_PORT = process.env.ORDER_PORT || 5050;

// Domain Name
const MAIN_IP = process.env.MAIN_IP || "192.168.1.117";

// Endpoints
const CATALOG_ENDPOINT = `http://${MAIN_IP}:${CATALOG_PORT}`;
const ORDER_ENDPOINT = `http://${MAIN_IP}:${ORDER_PORT}`;

// Create Express Server With JSON Middleware
const app = express().use(express.json());

// GET Book's Info By ID
app.get("/info/:id", async (req, res) => {
  const bookId = req.params.id;
  const response = await fetch(`${CATALOG_ENDPOINT}/query-by-item/${bookId}`);
  const body = await response.json();
  if (response.status === 200) console.log(JSON.stringify(body, null, 2));
  res.status(response.status).json(body);
});

// GET Books By Their Category
app.get("/search/:category", async (req, res) => {
  const cat = req.params.category;
  const response = await fetch(`${CATALOG_ENDPOINT}/query-by-subject/${cat}`);
  const body = await response.json();
  console.log(JSON.stringify(body, null, 2));
  res.status(200).json(body);
});

// PATCH Purchase Single Book
app.patch("/purchase/:id", async (req, res) => {
  const bookId = req.params.id;
  const response = await fetch(`${ORDER_ENDPOINT}/purchase/${bookId}`, {
    method: "patch"
  });
  const body = await response.json();
  if (response.status === 200) console.log(`Bought Book - ${body.title}`);
  res.status(response.status).json(body);
});

// PORT Listening Callback Function
const listenCallback = () =>
  console.log(`Active On: http://${MAIN_IP}:${PORT_NUMBER}`);

app.listen(PORT_NUMBER, listenCallback);
