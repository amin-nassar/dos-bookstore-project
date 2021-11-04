// Node Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch-commonjs");

// Servers' PORTs
const PORT_NUMBER = 5050;
const CATALOG_PORT =  3030;

// Domain IP
const MAIN_IP = "192.168.1.116";

// Endpoints
const CATALOG_ENDPOINT = `http://${MAIN_IP}:${CATALOG_PORT}`;

// Data File
const ordersFilePath = path.resolve(__dirname, "./orders.json");

// Persistent Data Function (Read, Write)
const readData = () => JSON.parse(fs.readFileSync(ordersFilePath));
const writeData = (data) =>
fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));

// Create express server
const app = express();

// Creating A New Order
const addNewOrder = ({ id, price }) => {
const orders = readData();
const newOrder = {
    id: orders.length + 1,
    itemId: id,
    price,
    timeStamp: Date.now()
};
orders.push(newOrder);
writeData(orders);
};

// PATCH Purchase A Certain Book
app.patch("/purchase/:id", async (req, res) => {
const { id: bookId } = req.params;
// Fetch Single Book Item
const response = await fetch(`${CATALOG_ENDPOINT}/query-by-item/${bookId}`);
const body = await response.json();
// If Book Was Found
if (response.status === 200) {
    // Check Book's Availablility
    if (body.quantity < 1) {
    res
        .status(400)
        .json({ error: "insufficient amount to perform purchase" });
    } else {
    // Purchase The Book (Decrease Quantity By One)
    const fullEndpoint = `${CATALOG_ENDPOINT}/update/${bookId}`;
    const response = await fetch(fullEndpoint, {
        headers: {
        "Content-Type": "application/json"
        },
        method: "patch",
        body: JSON.stringify({ quantity: -1 })
    });
    const body = await response.json();
    addNewOrder(body);
    res.status(200).json(body);
    }
} else res.status(response.status).json(body);
});

// PORT Listening Callback Function

const listenCallback = () =>
  console.log(`Active On: http://${MAIN_IP}:${PORT_NUMBER}`);

app.listen(PORT_NUMBER, listenCallback);