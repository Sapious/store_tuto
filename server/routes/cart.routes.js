const { getOwnedCart, addItemToCart, removeItemFromCart, getPublicCart } = require("../controllers/cart.controllers");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.get("/me", verifyToken, getOwnedCart);
router.put("/add", verifyToken, addItemToCart);
router.put("/remove", verifyToken, removeItemFromCart);
module.exports = router;

//TODO: public api to add_to_cart
