const express = require("express");
const categories = require("../routes/categories");
const products = require("../routes/product");
const user = require("../routes/user");
const cart = require("../routes/cart");
const order = require("../routes/order");
const login = require("../routes/login");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.static("public"));
  app.use("/api/category", categories);
  app.use("/api/product", products);
  app.use("/api/user", user);
  app.use("/api/cart", cart);
  app.use("/api/order", order);
  app.use("/api/login", login);
};
