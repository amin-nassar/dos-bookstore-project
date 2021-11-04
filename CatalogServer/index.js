// Node Modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Servers' Port
const PORT_NUMBER = process.env.CATALOG_PORT || 3030;

// Domain IP
const MAIN_IP = process.env.MAIN_IP || "192.168.1.117";

// Data File
const storeFilePath = path.resolve(__dirname, "./store.json");

// Persistent Data Function (Read, Write)
const readData = () => JSON.parse(fs.readFileSync(storeFilePath));
const writeData = (data) =>
  fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2));

// Create Express Server With JSON Middleware
const app = express().use(express.json());

// GET Query By Book's Category
app.get("/query-by-subject/:subject", (req, res) => {
  const books = readData();
  // Normalize Category Name
  const wantedCategory = req.params.subject.toLowerCase();
  // Filter Books With Category
  const resultBooks = books.filter(
    (book) => book.category.toLowerCase() === wantedCategory
  );
  res.status(200).json(resultBooks);
});

// GET Query By Book's ID
app.get("/query-by-item/:item", (req, res) => {
  const books = readData();
  const bookId = Number(req.params.item);
  // Find The First Element With ID
  const resultBook = books.find((book) => book.id === bookId);
  if (resultBook) res.status(200).json(resultBook);
  else res.status(404).json({ error: "Book Not Found" });
});

// PATCH Update Book's Price & Quantity
app.patch("/update/:id", (req, res) => {
  const books = readData();
  const bookId = Number(req.params.id);
  const wantedBook = books.find((book) => book.id === bookId);
  // Extract Price & Quantity From Request Body
  const { price, quantity } = req.body;

  // No Change If Any One Is NULL/Undefined
  wantedBook.quantity += quantity ?? 0;
  wantedBook.price = price ?? wantedBook.price;

  writeData(books);
  res.status(200).json(wantedBook);
});

// PORT Listening Callback Function
const listenCallback = () =>
  console.log(`Active On: http://${MAIN_IP}:${PORT_NUMBER}`);

// Start Listening (Starting The Server)
app.listen(PORT_NUMBER, listenCallback);
