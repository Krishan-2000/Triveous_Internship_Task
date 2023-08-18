const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");

// Add Product to Cart
router.post("/add", async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Add product to cart or update quantity if already exists
    const existingCartItem = user.cart.find((item) =>
      item.product.equals(productId)
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(201).send({ message: "Product added to cart successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error adding product to cart" });
  }
});

// View Cart
router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (error) {
    res.status(500).send({ message: "Error fetching cart" });
  }
});

// Update Cart Item Quantity
router.put("/update/:productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const cartItem = user.cart.find((item) => item.product.equals(productId));
    if (!cartItem) {
      return res.status(404).send({ message: "Product not found in cart" });
    }

    cartItem.quantity = quantity;
    await user.save();
    res.json({ message: "Cart item quantity updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error updating cart item quantity" });
  }
});

// Remove Product from Cart
router.delete("/remove/:productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => !item.product.equals(productId));
    await user.save();
    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error removing product from cart" });
  }
});

module.exports = router;
