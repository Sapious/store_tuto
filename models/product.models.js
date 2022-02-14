const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String },
		description: { type: String },
		price: { type: Number },
		category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
