const {
    checkoutOrder,
    getOrder,
    getOrders,
    getOwnedOrders,
    confirmOrder,
    fullfilOrder,
    cancelOrder,
    getOwnedOrder,
} = require("../controllers/order.controllers");
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
const router = require("express").Router();

router.get("/checkout", verifyToken, checkoutOrder);
router.get("/me", verifyToken, getOwnedOrders);
router.get("/:orderId", verifyToken, isAdmin, getOrder);
router.get("/:orderId/me", verifyToken, getOwnedOrder);
router.get("/:orderId/confirm", verifyToken, confirmOrder);
router.get("/:orderId/cancel", verifyToken, cancelOrder);
router.get("/:orderId/fullfil", verifyToken, fullfilOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
