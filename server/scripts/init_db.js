//import section
const bcrypt = require("bcryptjs");
const axios = require("axios");
const Admin = require("../models/admin.models");
const Category = require("../models/category.models");
const Product = require("../models/product.models");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/store_tuto");
mongoose.connection.on("connected", () => {
    console.log("DB connected");
});
mongoose.connection.on("error", err => {
    console.log("mongoose failed with", err);
});
async function initAdmin() {
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash("26765990", salt);
    const newAdmin = new Admin({
        firstName: "raed",
        lastName: "bahri",
        email: "raedbahri90@gmail.com",
        password: hashedPassword,
    });

    await newAdmin.save();
}
async function initCategories() {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    res.data.forEach(async cat => {
        const newCat = new Category({
            title: cat,
        });
        await newCat.save();
    });
}

async function initProducts() {
    const res = await axios.get("https://fakestoreapi.com/products");
    res.data.forEach(async prod => {
        const category = await Category.findOne({ title: prod.category });
        
        const newProduct = new Product({
            image: prod.image,
            title: prod.title,
            description: prod.description,
            price: prod.price,
            category: category.id,
        });
        await newProduct.save();
    });
}
try {
    const init = async () => {
        await initAdmin();
        await initCategories();
        await initProducts();
        console.log("Done!");
    };
    init();
} catch (err) {
    console.log(err);
}
