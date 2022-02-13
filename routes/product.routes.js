const { createProduct, updateProduct } = require("../controllers/product.controllers");
const router = require("express").Router();

router.post("/", createProduct);
router.put('/:productId', updateProduct)

module.exports = router