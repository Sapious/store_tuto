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
router.put("/:productSlug", verifyToken, updateProduct);
router.delete("/:productSlug", verifyToken, deleteProduct);
router.get("/:productSlug", getProduct);
router.get("/", getProducts);
module.exports = router;

// TODO: add review product routes
// TODO: add feedback on product routes