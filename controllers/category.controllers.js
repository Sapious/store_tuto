const Category = require("../models/category.models");

const createCategory = async (req, res) => {
	const newCategory = new Category({
		title: req.body.title,
		description: req.body.description,
	});
	try {
		const savedCategory = await newCategory.save();
		return res.status(201).json(savedCategory);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getCategory = async (req, res) => {
	const id = req.params.categoryId;

	try {
		const category = await Category.findById(id);
		return res.status(200).json(category);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		return res.status(200).json(categories);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const deleteCategory = async (req, res) => {
	const id = req.params.categoryId;

	try {
		const deletedCategory = await Category.findByIdAndDelete(id);
		return res.status(200).json(deletedCategory);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const updateCategory = async (req, res) => {
	const id = req.params.categoryId;

	try {
		const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(updatedCategory);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.createCategory = createCategory;
module.exports.updateCategory = updateCategory;
module.exports.getCategory = getCategory;
module.exports.getCategories = getCategories;
module.exports.deleteCategory = deleteCategory;
