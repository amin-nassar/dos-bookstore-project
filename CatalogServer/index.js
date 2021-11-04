// Node Modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Dummy Data
const books = [
  {
    id: 1,
    title: "How To Get a Good Grade In DOS In 40 Minutes a Day",
    category: "Distributed Systems",
    quantity: 20,
    price: 20
  },
  {
    id: 2,
    title: "RPCs For Noobs",
    category: "Distributed Systems",
    quantity: 30,
    price: 25
  },
  {
    id: 3,
    title: "Xen & The Art Of Surviving Undergraduate School",
    category: "Undergraduate School",
    quantity: 40,
    price: 30
  },
  {
    id: 4,
    title: "Cooking For The Impatient Undergrad",
    category: "Undergraduate School",
    quantity: 50,
    price: 35
  }
];

// Servers' Port
const PORT_NUMBER = 3030;

// Domain IP
const MAIN_IP = "192.168.1.117";

// Create Express Server With JSON Middleware
const app = express().use(express.json());

// GET Query By Book's Category
app.get("/query-by-subject/:subject", (req, res) => {
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
  const bookId = Number(req.params.item);
  // Find The First Element With ID
  const resultBook = books.find((book) => book.id === bookId);
  if (resultBook) res.status(200).json(resultBook);
  else res.status(404).json({ error: "Book Not Found" });
});

// PATCH Update Book's Price & Quantity
app.patch("/update/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const wantedBook = books.find((book) => book.id === bookId);
  // Extract Price & Quantity From Request Body
  const { price, quantity } = req.body;

  // No Change If Any One Is NULL/Undefined
  wantedBook.quantity += quantity ?? 0;
  wantedBook.price = price ?? wantedBook.price;

  res.status(200).json(wantedBook);
});

// PORT Listening Callback Function
const listenCallback = () =>
  console.log(`Active On: http://${MAIN_IP}:${PORT_NUMBER}`);

// Start Listening (Starting The Server)
app.listen(PORT_NUMBER, listenCallback);
