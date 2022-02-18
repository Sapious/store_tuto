const mongoose = require("mongoose");
const Cart = require("./cart.models");
const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: {
            type: String,
            unique: true,
            index: true,
            lowercase: true,
            required: true,
        },
        password: { type: String },
        address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
        isAdmin: { type: Boolean, default: false },
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    },
    { timestamps: true },
);
UserSchema.pre("validate", function (next) {
    if (!this.cart) {
        this.createCart();
    }
    next();
});
UserSchema.methods.createCart = async function () {
    const newCart = new Cart();
    this.cart = (await newCart.save())._id;
};
module.exports = mongoose.model("User", UserSchema);
