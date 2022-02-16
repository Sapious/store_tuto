const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                price: { type: Number, min: 0 },
                quantity: { type: Number, min: 0 },
                total: { type: Number, min: 0 },
            },
        ],
        totalPrice: { type: Number, min: 0 },
        totalPriceWithTax: { type: Number, min: 0 },
        taxPercentage: { type: Number, min: 0, default: 19 },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Cart", CartSchema);
