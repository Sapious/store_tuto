const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
const checkoutOrder = async (req, res) => {
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
        cart.items = [];
        cart.totalPrice = 0;
        cart.totalPriceWithTax = 0;
        await cart.save();
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
const getOwnedOrders = async (req, res) => {
    const userId = req.verifiedUser._id;
    try {
        const orders = await Order.find({ client: userId });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const confirmOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const confirmedOrder = await Order.findByIdAndUpdate(orderId, { status: "confirmed" }, { new: true });
        return res.status(200).json(confirmedOrder);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const cancelOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const canceledOrder = await Order.findByIdAndUpdate(orderId, { status: "canceled" }, { new: true });
        return res.status(200).json(canceledOrder);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const fullfilOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const fulfilledOrder = await Order.findByIdAndUpdate(orderId, { status: "fulfilled" }, { new: true });
        return res.status(200).json(fulfilledOrder);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getOwnedOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const userId = req.verifiedUser._id;
    try {
        const order = await Order.findById(orderId);
        if (userId === order.client) {
            return res.status(200).json(order);
        } else {
            return res.status(403).json("you don't own this order");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.getOwnedOrder = getOwnedOrder;
module.exports.confirmOrder = confirmOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.fullfilOrder = fullfilOrder;
module.exports.getOwnedOrders = getOwnedOrders;
module.exports.checkoutOrder = checkoutOrder;
module.exports.getOrder = getOrder;
module.exports.getOrders = getOrders;
