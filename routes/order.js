const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const auth = require("../middleware/auth");

// Order Placement
router.post("/", auth, async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user._id;

    // Calculate total amount
    let totalAmount = 0;
    for (const { product, quantity } of products) {
      const productDetail = await Product.findById(product);
      if (!productDetail) {
        return res
          .status(404)
          .send({ message: `Product with ID ${product} not found` });
      }
      totalAmount += productDetail.price * quantity;
    }

    const order = new Order({
      user: userId,
      products,
      totalAmount,
    });

    const createOrder = await order.save();
    res.status(201).send(createOrder);
  } catch (error) {
    res.status(500).send({ message: "Error placing order" });
  }
});

// Order History for Authenticated User
router.get("/history", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ message: "Error fetching order history" });
  }
});

// Order Details by Order ID
router.get("/:orderId", auth, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;

    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ message: "Error fetching order details" });
  }
});

module.exports = router;
