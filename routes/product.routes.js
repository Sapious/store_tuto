const {
	createProduct,
	updateProduct,
    deleteProduct,
    getProduct,
    getProducts,
} = require("../controllers/product.controllers");
const router = require("express").Router();

router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/:productId", getProduct);
router.get('/', getProducts)
module.exports = router;
