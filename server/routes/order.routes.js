const { createOrder, getOrder, getOrders } = require("../controllers/order.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.get("/:orderId", verifyToken, getOrder);
router.get("/", verifyToken, getOrders);
module.exports = router;

// TODO: router to confirm, cancel, fullfill an order
// TODO: router to get my own orders
// TODO: add middleware to verify ownership of order
