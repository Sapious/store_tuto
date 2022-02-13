const Product = require("../models/product.models");

const createProduct = async (req, res) => {
	const newProduct = new Product({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
	});
	try {
		const savedProduct = await newProduct.save();
		return res.status(201).json(savedProduct);
	} catch (err) {
		return res.status(500).json(err);
	}
};

//get product by id

//get products

//delete product

const updateProduct = async (req, res) => {
	const id = req.params.productId;

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(updatedProduct);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;