const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
        status: { type: String, enum: ["canceled", "pending", "confirmed", "fulfilled"], default: "pending" },
        address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
        totalPriceWithTax: { type: Number, min: 0 },
        taxPercentage: { type: Number, min: 0, default: 19 },
        client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true },
);

OrderSchema.pre("validate", function (next) {
    calculateTotal();
    next();
});

OrderSchema.methods.calculateTotal = function () {
    this.items.forEach(item => {
        this.totalPrice += item.total;
    });
    this.totalPriceWithTax = (this.totalPrice * this.taxPercentage) / 100;
};

module.exports = mongoose.model("Order", OrderSchema);
