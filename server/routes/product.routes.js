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
//TODO: use slug instead of id

// TODO: add review product routes (optional)
// TODO: add feedback on product routes (optional)