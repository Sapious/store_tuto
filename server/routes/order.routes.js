const { createOrder, getOrder, getOrders } = require("../controllers/order.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, createOrder);
router.get("/:orderId", verifyToken, getOrder);
router.get("/", verifyToken, getOrders);
module.exports = router;
