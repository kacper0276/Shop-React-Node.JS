const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./router/web");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Mount routes
app.use(route);

module.exports = app;
