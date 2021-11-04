// Node Modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// Servers' Port
const PORT_NUMBER = 3030;

// Domain IP
const MAIN_IP = "192.168.1.107";

// Create Express Server With JSON Middleware
const app = express().use(express.json());

// PORT Listening Callback Function
const listenCallback = () =>
  console.log(`Active On: http://${MAIN_IP}:${PORT_NUMBER}`);

// Start Listening (Starting The Server)
app.listen(PORT_NUMBER, listenCallback);
