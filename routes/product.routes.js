const {
	createProduct,
	updateProduct,
	deleteProduct,
	getProduct,
	getProducts,
} = require("../controllers/product.controllers");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/", verifyToken, createProduct);
router.put("/:productId", verifyToken, updateProduct);
router.delete("/:productId", verifyToken, deleteProduct);
router.get("/:productId", getProduct);
router.get("/", getProducts);
module.exports = router;
