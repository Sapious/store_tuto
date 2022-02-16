const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
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
        isAdmin: { type: Boolean, default: true },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Admin", AdminSchema);
