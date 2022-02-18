const Cart = require("../models/cart.models");

const getOwnedCart = async (req, res) => {
    const cartId = req.verifiedUser.cart;

    try {
        const cart = await Cart.findById(cartId);
        return res.status(200).json(cart);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const emptyCart = async (req, res) => {
    const cartId = req.verifiedUser.cart;

    try {
        const cart = await Cart.findById(cartId);
        cart.items = [];
        cart.totalPrice = 0;
        cart.totalPriceWithTax = 0;
        const savedCart = await cart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const addItemToCart = async (req, res) => {
    const cartId = req.verifiedUser.cart;
    const item = { ...req.body.item, total: req.body.item.price * req.body.item.quantity };
    try {
        const cart = await Cart.findById(cartId);
        const itemIndex = cart.items.map(itemElement => itemElement.product.toString()).indexOf(item.product);
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + item.quantity;
            cart.items[itemIndex].total = cart.items[itemIndex].quantity * cart.items[itemIndex].price;
        } else {
            cart.items.push(item);
        }

        const savedCart = await cart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const removeItemFromCart = async (req, res) => {
    const cartId = req.verifiedUser.cart;

    try {
        const cart = await Cart.findById(cartId);
        const items = cart.items.filter(item => item.product.toString() !== req.body.item);
        cart.items = items;
        const savedCart = await cart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.getOwnedCart = getOwnedCart;
module.exports.emptyCart = emptyCart;
module.exports.removeItemFromCart = removeItemFromCart;
module.exports.addItemToCart = addItemToCart;
