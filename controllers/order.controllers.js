const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
const createOrder = async (req, res) => {
    const cart = await Cart.findById(req.verifiedUser.cart);
    const newOrder = new Order({
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPriceWithTax: cart.totalPriceWithTax,
        taxPercentage: cart.taxPercentage,
        address: req.verifiedUser.address,
        client: req.verifiedUser._id,
    });

    try {
        const savedOrder = await newOrder.save();
        return res.status(201).json(savedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getOrder = async (req, res) => {
    const id = req.params.orderId;

    try {
        const order = await Order.findById(id);
        return res.status(200).json(order);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.createOrder = createOrder;
module.exports.getOrder = getOrder;
module.exports.getOrders = getOrders;
