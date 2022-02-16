const mongoose = require("mongoose");
const slug = require("slug");
const ProductSchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: String },
        slug: { type: String, unique: true, lowercase: true },
        description: { type: String },
        price: { type: Number },
        promotionPrice: { type: Number },
        isPromotion: { type: Boolean, default: false },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        reference: { type: String },
    },
    { timestamps: true },
);

ProductSchema.pre("validate", function (next) {
    if (!this.slug) {
        slugify();
    }
    next();
});
ProductSchema.methods.slugify = function () {
    this.slug = slug(this.title) + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Product", ProductSchema);
