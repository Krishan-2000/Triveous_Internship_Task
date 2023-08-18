const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Category = require("../models/category");

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const category = new Category({
      name,
    });

    const createCategory = await category.save();
    res.status(201).send(createCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating category" });
  }
});

module.exports = router;
