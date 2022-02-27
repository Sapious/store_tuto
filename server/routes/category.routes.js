const {
	createCategory,
	updateCategory,
	deleteCategory,
	getCategory,
	getCategories,
} = require("../controllers/category.controllers");
const router = require("express").Router();

router.post("/", createCategory);
router.put("/:categoryId", updateCategory);
router.delete("/:categoryId", deleteCategory);
router.get("/:categoryId", getCategory);
router.get("/", getCategories);
module.exports = router;
