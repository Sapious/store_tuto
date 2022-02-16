const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
    {
        street: { type: String },
        city: { type: String },
        country: { type: String },
        zipCode: { type: Number },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Address", AddressSchema);
