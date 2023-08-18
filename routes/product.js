const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Product Listing by Category
router.get("/categories/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const product = await Product.findById(categoryId);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: "Error fetching products" });
  }
});

// Product Details
router.get("/product/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch {
    res.status(500).send({ message: "Error fetching product details" });
  }
});

// Add a New Product
router.post("/", async (req, res) => {
  try {
    const { title, price, description, availability, category } = req.body;
    const product = new Product({
      title,
      price,
      description,
      availability,
      category,
    });
    const createProduct = await product.save();
    res.status(201).send(createProduct);
  } catch (error) {
    res.status(500).send({ message: "Error creating product" });
  }
});

// Update Product
router.put("/update/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const { title, price, description, availability } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        price,
        description,
        availability,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).send({ message: "Error updating product" });
  }
});

// Delete Product
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting product" });
  }
});

module.exports = router;
